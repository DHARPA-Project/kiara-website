# How to view the data in a NetworkData type

This article assumes you have `kiara_plugin.tabular` installed at version `~0.5.1`, and `kiara_plugin.network_analysis` at version `~0.5.1`.

Quite often, you'll want to inspect the raw contents of the nodes and/or edges tables which contain the data behind a `NetworkData` value. This might be to get an overview of what's in your network, or to look at the values of centrality measures you've just calculated and applied to the network.

The nodes and edges tables can be accessed from a `NetworkData` value by calling the `get_table` method on the `NetworkData`, passing the appropriate table name `"nodes"` or `"edges"` as argument. This resulting value is a `KiaraTable`, which in turn is backed by a `pyarrow.Table` from [Apache arrow](https://arrow.apache.org/docs/python/generated/pyarrow.Table.html). The Arrow table contains the raw data, and can be accessed via the `arrow_table` property on a `KiaraTable`.

## View the entire contents of the nodes or edges table

In order to view the data contained in the Arrow table, you'll need to turn it into a different data format. The `pyarrow.Table` data type provides a few options for converting the data, for example `to_pandas()` to get a NumPy array or pandas DataFrame, and `to_pydict()` and `to_pylist()` to get plain Python data types, which you can then manipulate as you choose.

Be aware that doing any of these data transformations means your whole nodes or edges table will be loaded into memory on your computer. If your tables are really big, this could cause your code to run slowly and use a lot of memory (RAM).

Here's an example of how to get the edges table from an imagined existing `NetworkData` value, and print it out as a list of Python dictionaries, where each dictionary represents a row in your table, the keys the column names and the values the associated data.

```python
from kiara.api import KiaraAPI
kiara = KiaraAPI.instance()
# some code here to get a NetworkData value loaded into kiara
# let's call it my_network_data

# get the edges table for the network, as a `KiaraTable`
edges_kiara_table = my_network_data.get_table("edges")
# if you're in a jupyter context, printing edges_kiara_table will give you a preview of the data

# get all the data via the underlying Arrow table
edges_data = edges_table.arrow_table.to_pylist()
# print just the first edge in that table
print(edges_data[0])
# will look something like this
# {'_edge_id': 0, '_source': 886, '_target': 49, '_count_dup_directed': 1, '_idx_dup_directed': 1, '_count_dup_undirected': 1, '_idx_dup_undirected': 1}
```

## View a specific subset of the nodes or edges table

If instead you want to see a subset of one of your tables, using a SQL query to select some of the data, you can use the `query.table` operation from `kiara_plugin.tabular`. First extract the nodes or edges table using `get_table`, then query the resulting `KiaraTable` value using `query.table`. The result of this is a also a `KiaraTable`, so you may wish to extract all the data in the same way as above.

```python
from kiara.api import KiaraAPI
kiara = KiaraAPI.instance()
# some code here to get a NetworkData value loaded into kiara
# let's call it my_network_data

# get the nodes table for the network, as a `KiaraTable`
nodes_kiara_table = my_network_data.get_table("nodes")

# Let's get the first 5 nodes with names a bit like "Johan"
# the table name in your SQL query must be "data"
query_inputs = {
    "table": nodes_table,
    "query": "SELECT _node_id, id FROM data WHERE id LIKE '%Johan%' LIMIT 5",
}
sql_results = kiara.run_job(
    "query.table",
    inputs=query_inputs,
)["query_result"]
# if you're in a jupyter context, printing sql_results will give you a preview of the resulting data

# if not, you can get the raw data from Arrow in the same way
full_query_data = sql_results.data.arrow_table.to_pylist()
print(full_query_data)
# A list of up to 5 nodes, something like
# [{'_node_id': 9, 'id': 'Aerssen, Johan, 1579-1654'}, 
# {'_node_id': 33, 'id': 'Antonides van der Goes, Johannes, 1647-1684'}, .....]
```

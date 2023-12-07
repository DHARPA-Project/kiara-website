# How to import data into kiara

Note that kiara calls it onboarding, and it means data ends up in the data store (which might have a page?). Think about the language here - do we want to use import, which might be what researchers would instinctively call this process, or onboarding which is technically what kiara calls it?

[basically this](https://dharpa.org/kiara.documentation/latest/usage/getting_started/#finding-the-right-command-and-how-to-use-it)

[downloading is also onboarding??](https://dharpa.org/kiara.documentation/latest/workshop/workshop/#downloading-files)


## How to import a local file into kiara

A local file is a file that is currently on your computer, for example in your "Documents" folder or alongside the Python code you're working on.

To import a local file, you don't need any plugins installed. Use the `import.local.file` operation provided in `kiara.core`. The existing documentation for this operation [is here](https://dharpa.org/kiara/latest/included_components/operations/#kiara_info.operations.import.local.file)

Here's what importing a local file looks like in code.

```python
# get set up with the Kiara python API
from kiara.api import KiaraAPI

kiara = KiaraAPI.instance()

# let's imagine you have some data stored next to where you're going to run this code from (in the same directory)
relative_path = "./my_local_data.csv"
# and some other data somewhere else on your filesystem
absolute_path = "/Users/demouser/Documents/data/my_absolute_data.txt"
# you can import a file using either kind of file path

# the import.local.file operation takes a single input, called path, which is the path to your file
relative_path_inputs = {"path": relative_path}

import_file_results = kiara.run_job("import.local.file", inputs=relative_path_inputs)

# to then access the file you imported, get it from the 'file' key in the result
imported_file = import_file_results["file"]
```

When you want to do other things with this file you imported, you'll want to use the value in `imported_file`, or the ID or alias of that thing, as input to other operations.

If you want to use the file data again without recomputing, you might want to add the imported file to the Kiara store. 

If you have more than one file to import, and they all logically belong together (for example making up a text corpus), you might want to instead use the `import.local.file_bundle` operation instead.
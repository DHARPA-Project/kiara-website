# How we write code in docs

It is useful for us to use consistent style, patterns and names of things in all example code, particularly in end-user facing docs. We decided 

- the import line at the start of all examples should be `from kiara.api import KiaraAPI`, optionally with a comment about what version we're assuming if that is relevant for the example.
- If any plugins are required, note that where imports would normally go, including versions
- immediately after this, get the `instance` from `KiaraAPI` and name it `kiara` - `kiara = KiaraAPI.instance()`
- If you're going to run an operation:
  - define the inputs to the operation in a separate variable, called `<something_meaningful>_inputs`, depending on what your example is actually doing. It is a `dict` structure. Consider adding comments if there's anything meaningful to say about individual values
  - always use `kiara.run_job` to do the operation, pass the inputs in from the variable you just made
  - call the thing you get back from `run_job` `<something_meaningful>_results` (plural because you get back a lot of things rather than a single value)
  - Show how to extract the most meaningful thing from the results, for example if the operation is import a file, show how to get the file
- Use comments liberally, although prefer markdown prose if possible. If you're going to break up the code and explain it line-by-line in prose, also provide the full example (if it's fairly short) at the end for ease of copy/paste, and to pull the content together for a final summary.
- Don't use type hints by default, although you may in documentation targeted at more technical users if it's really meaningful


Here's a full example, illustrating most of these things

```python
from kiara.api import KiaraAPI
# no plugins required

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

Notice the initial setup block, which should always mostly be the same, and the descriptive variable names.
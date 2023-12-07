# Terms

> There's loads of terms thrown around when talking about kiara, which have very specific meanings in this context. We should define the main ones, and when we use those terms in other prose, link to here. I (caro) am super vague on what most of these things actually mean, this existing would be super helpful for me!

## what's a kiara module?

explain this both high level - what does a module mean to a user? some collection of things kiara can do
and at a low level - a module is a python class which subclasses something?

CB: Modules are what you write to create operations. There can be one or multiple modules in one .py document (which allows you to define imported packages and author/desciption metadata). A module will define the inputs and outputs required for an operation; modules are therefore the 'back-end' of the operation, which gets called in the interface/IDE/CLI. Essentially they are the same thing, in two different terms.

MB: On a technical level, a module is a python class that subclasses the [`kiara.modules.KiaraModule`](https://github.com/DHARPA-Project/kiara/blob/develop/src/kiara/modules/__init__.py#L299) base class. If someone wants to implement their own module, they have to inherit from this class, and implement 3 methods:

- `def create_inputs_schema(self)`: returns the input schema for this module, this is what the user will be asked to provide

- `def create_inputs_schema(self)`: returns the output schema for this module, this describes the data that will be returned by this module (can contain one or several output fields)

- `def process(inputs, outputs)`: this is where the actual processing happens, the inputs and outputs are passed in as instances of [ValueMap](https://github.com/DHARPA-Project/kiara/blob/develop/src/kiara/models/values/value.py#L1318), and the module is expected to read the inputs, do something with them, and write the results to the outputs

In addition, modules can have a configuration (to be able to configer them to behave in a specific way -- which for example could change the output of the `create_input_schema` and `create_output_schema` functions). A module name in combination with its configuration (dict) is called an 'operation' (see below).

Relevant links:

- https://dharpa.org/kiara.documentation/latest/extending_kiara/creating_modules/the_basics/

## what's a kiara plugin?

again, high level and low level explanation. link out to how to make a plugin tutorial

CB: A kiara 'package': contains all the modules associated with a particular mode of analysis (topic modelling, network analysis etc.) with relevant documentation and, where included, data. Allows people to focus on just the bits they want to use, without downloading everything if they don't want to. Will also allow users to have their own plugin, where they can store all the additional modules that they have created.

MB: a plugin is a Python package that can be published to pypi.org or as conda package. It can be installed into a Python/Conda environment like any other package, and extends *kiara* functionality in several ways:

- add `data types`: in most cases, plugins won't contain new data types. But in some cases they might (for example the 'network_analysis` plugin adds the 'network_data' data type)
- add `modules`: this is the main use case for a plugin, to contain modules that can do specific processing tasks the plugin developer wants their users to be able to do
- add lower level Python models or functionality: in most cases a plugin is a collection of data-types/modules that are related in some way, mostly by belonging to the same area of research (language_processing, network_analysis). But a plugin can also be created for a specific use case or frontend technology (e.g. a  plugin that would implement an interactive TUI client or a REST API, or functionality, data-types and/or modules for a mini app like the tropy one)

On a technical level, it is recommended to use the existing cookiecutter kiara plugin template: https://github.com/DHARPA-Project/kiara_plugin.develop

To create a plugin instance, (at the moment -- not sure if we should make this a bit easier) you would use [cruft](https://github.com/cruft/cruft):

```
cruft create https://github.com/DHARPA-Project/kiara_plugin.develop.git
```

## what's a kiara pipeline?

a pipeline isn't a workflow? link out to pipeline tutorial

CB: A collection of modules ordered together (like a defined function) - allows users to run a series of functions/operations all together in one go, rather than step by step.

MB: A pipeline is a DAG (Directed Acyclic Graph), where each node is an operation (called 'step' within a pipeline), and the edges are the input-output connections between those. Pipelines are declarative, so the user would create a data structure to describe the pipeline, and *kiara* would then parse and assemble the internal representation, and calculate things like execution order, which inputs a user needs to provide, and what output a pipeline produces. For *kiara*s purposes, a pipeline is also an operation (using the 'pipeline' kiara module, and the declarative pipeline structure as module config). 

Relevant links:

- https://dharpa.org/kiara.documentation/latest/extending_kiara/pipelines/assemble_pipelines/

## what's a workflow?

we kinda use this to mean 2 things, the steps a researcher does to get some results from some data, and a specific kind of file?
[Some of this information also relevant?](https://dharpa.org/kiara/latest/design_docs/architecture/workflows/#the-workflow-lifecycle), maybe we even want a whole page on workflows as a concept?

CB: The process start to end; can be descriptive (aka qualitative understanding of the research process) or literal in terms of the entire coding process. In this second sense, it may be synonymous with pipeline if the pipeline contains all the steps needed for the entire process. It may also be a combination of individual operations and a pipeline, or any conceivable use of kiara start to finish.

MB: This is my personal use of the word, so not sure how we should define that 'officially'. A workflow (or workflow session) is everything that happens between the point a user arrives with an identified piece of input data, and leaves with a computational result that is meaningful in answering one or several research questions related to that input dataset. This includes:

- the input dataset
- the pipeline (either a static one, or one that 'grows' over time in a dynamic way)
- any parameters/other inputs that are used to configure the pipeline
- the intermediate results -- all dependent on the inputs, so can change over time
- the final result(s) -- all dependent on the inputs, so can change over time

## what's a data type?

steps (/operations??) only work on specific data types, they can be something simple like a boolean (true/false) or a string, or complicated like a table with a specific structure

technically, they are a python class that subclasses something??

CB: a bit like string, list, integer etc. in python; essentially same as python data types, though also with kiara specific ones (like network data)

MB: on a technical level a *kiara* data type wraps a 'well-defined' Python data structure, and implements specific features *kiara* needs to be able to call on for each supported data type. This includes:

- serialization/deserialization
- 'pretty printing'/'data preview'
- hashing
- documentation (that can be displayed to end-users so they understand the characteristics of the data type)

*kiara* data types inherit from [kiara.data_types.DataType](https://github.com/DHARPA-Project/kiara/blob/develop/src/kiara/data_types/__init__.py), and like modules they can optionally be configured. Creating a custom data type is not documented yet, I'll do that once we have a first draft version of our docs ready so I can link to relevant other topics, since it's the most difficult thing I'd expect non-core developers having to do (very seldomly).

## what's an operation?
CB: A function; 'list operations' gives you all the possible kiara functions, or modules.

MB: As stated above, an operation is the name of the *kiara* module, combined with its module configuration (dict). An operation can always be identified by its hash, which is built using the module name and module configuration dictionary. In most cases, users will probably deal with operations instead of modules, since what we offer on frontends will likely be pre-configured modules. It is possible to dynamically create operations at runtime for users, but that would entail harder to user frontends and some unintuitiveness, which is the main reasons the 'operations' abstractions (and operation ids) exist.

## what's a model?

MB: Internal Python object schema that is used very liberally within *kiara*. Users won't really come in contact with them often (if at all). In some advanced cases other developers might encounter them, I'd prefer to document those instances on a case by case basis, but for the glossary this should be enough I think.

## What's the data store?

maybe this wants a whole page, link also to architecture and reproducible research/lineage. What does it mean to onboard data into kiara, how does it track lineage etc

MB: The internal place where *kiara* stores and manages data the user wants to keep.

Long answer here: https://github.com/DHARPA-Project/kiara-website/issues/12

## what's kiara context

MB: A sort of 'project-based' environment, containing a specific data store. Is used to group together data and jobs (operations on that data) that the user wants to keep together for one reason or another. 

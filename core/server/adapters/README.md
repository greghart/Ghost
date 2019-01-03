# Adapters

This document aims to serve as a short introduction to what adapters are in 
the Ghost codebase.

Adapters are a method of configuring how a given component in Ghost works. 
They are distinguished from other configuration options by being complex 
enough to warrant custom code. For example, instead of configuring how
local files are stored, we want to customize the file persistence layer 
completely.

Ghost currently has file storage and scheduling built as adapters.

## Terminology

Adapter - the component built with an adaptation layer in mind.
Adapter Implementation - a specific implementation for an adapter.

## Technical Design

Currently, there is no common code between adapters. Instead, the common 
thread is how they are consumed, and the expectation that custom adapter
implementations require coding. 

The primary requirements of an adapter are:
1. Every adapter *must* be setup and configured properly for Ghost to function.
2. Thus, every adapter *must* come with a built-in default implementation.
3. Each adapter must have a unique key
4. Each adapter implementation should have a unique key
3. The active implementation for an adapter should be configurable, as well as 
    options for separate implementations side-by-side.
4. Custom adapter implementations should just need to be code added in a specific 
    location, or a custom installed package.

example adapter configuration 
```
{
  "adapter": {
    "active": "my-adapter-implementation",
    "my-adapter-implementation": {
      "key": "configured"
    }
  }
}
```

TODO: Setup a basic interface for how adapters are setup to allow for a cleaner codebase
and possible introspection in the future.

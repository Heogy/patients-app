# DIM3 - Java Framework

## Introduction

DIM3 Java frameworks is a set of tools that facilitate the development of java spring applications.

It is based on the MVC pattern and the dependency injection principle.

It is designed to be used in a microservice architecture.

It is composed of several modules that can be used independently.

## Modules

### Context

The context module is helps to manage the application requests context. It is based on the ThreadLocal class and is
designed to be used in a multi-threaded environment by passing the context from one thread to another.

### Event

The event module is a simple module that helps to build an event response and publish it to amqp. It also provides event
storing capabilities.

### Exception

The exception module is in reality a unique "Bug" exception class that inherits from NestedRuntimeException.

### i18n

The i18n module is a simple module that helps getting the "locale" according to the authenticated user.

### JsonApi

The JsonApi module is a simple module that helps to build a JsonApi response.
It is based on the JsonApi specification (http://jsonapi.org/).

It also provides spring bean configuration to automatically serialize the HTTP responses to JsonApi.

### Logging

Provides an environment post processor that allows to configure the logback logger from the application.properties file.

### Persistence

This module provides :

- date converters for the JPA entities.
- helpers to order null values last in the JPA queries.

### Progress

The progress module is a simple module that helps to build a progress response and publish it to amqp.
It also provides a progress monitor that can be used to monitor the progress of a task.

### Security

The security module is a module that helps to manage the authentication and authorization of the application.
It provides user data structures, authentication and authorization services, spring security configuration and JWT token
management.

### Web

This module's purpose is to enhance http requests and responses by adding some useful information to them in http
headers :

- JWT token
- SESSION_ID
- SERVER_CORRELATION_ID
- CLIENT_CORRELATION_ID
- User info

### Websocket

The websocket module that contains a spring websocket configuration. It also provides error handling, jsonapi
serialization and authentication.

## Thoughts about this project

### Purpose

Despite the quality of the code and the in-depth knowledge of spring framework. I wonder about the motivations for such
a project.

What problem are we trying to solve? Apart from some technical constraints linked to communication between DIM3
services (jsonapi, headers, etc.) which could be worth sharing between services. There is no business specificity that
would merit an abstraction shared between services.

In short, if it's an example collection, it seems very good to me. If it's a framework or library, I remain more
doubtful.

### Implementation

##### Overall

- The code is very clean and well structured.
- The code documents itself. The code is very readable and understandable.
- Lack of unit tests. (22% lines covered)

##### Some details

- usage of Map<String, Object> instead of generics.
- usage of Object instead of generics.
- casting
- usage of raw types
- no usage of final variables when possible
- usage of Optional instead of null
- Authorisation :
    - force the signature algorithm
    - force claims
    - why need to generate jwt? why not just use the token provided by the client? No OAuth2 and authorization server?
    - why not using asymmetric keys?
- some null checks are missing
- why not using multi-module gradle project? In order build and publish each module independently.

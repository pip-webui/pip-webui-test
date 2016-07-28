# <img src="https://github.com/pip-webui/pip-webui/blob/master/doc/Logo.png" alt="Pip.WebUI Logo" style="max-width:30%"> <br/> Testing primitives

![](https://img.shields.io/badge/license-MIT-blue.svg)

Automated testing in web applications often requires to mock RESTful calls and substitude server data
with predictable test databases. Pip.WebUI.Test modules contains data generators and mocked REST resources
that used across all Pip.WebUI modules. They also used in Pip.WebUI samples and can help in testing final applications.

### Test data generators

Data generators allow to create predefined or random data objects, or update existing object with random changes.

Todo: Add code snippet to demonstrate use of data generators

### Mocks for REST resources

Connected controls in Pip.WebUI rely on certain server REST API. Framework user is responsible for implementing that API 
according to specifications. For testing that API can replaced with mocked resources from this module. 
The resources shall be registered in pipRest services as shown on the snippet below.

Todo: Add code snippet to demonstrate use of mocked rest resources (how to plug standard and custom resources).

## Learn more about the module

- [User's guide](doc/UsersGuide.md)
- [Online samples](http://webui.pipdevs.com/pip-webui-test/index.html)
- [API reference](http://webui-api.pipdevs.com/pip-webui-test/index.html)
- [Developer's guide](doc/DevelopersGuide.md)
- [Changelog](CHANGELOG.md)
- [Pip.WebUI project website](http://www.pipwebui.org)

## <a name="dependencies"></a>Module dependencies

* [pip-webui-lib](https://github.com/pip-webui/pip-webui-lib): angular, angular-mocks, chance and other 3rd party libraries

## <a name="license"></a>License

This module is released under [MIT license](License) and totally free for commercial and non-commercial use.

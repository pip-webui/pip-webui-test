# <img src="https://github.com/pip-webui/pip-webui/raw/master/doc/Logo.png" alt="Pip.WebUI Logo" style="max-width:30%"> <br/> Testing primitives

![](https://img.shields.io/badge/license-MIT-blue.svg)

Automated testing in web applications often requires to mock RESTful calls and substitude server data
with predictable test datasets. Pip.WebUI.Test modules contains data generators and mocked REST resources
that are used across all Pip.WebUI modules. They are also used in Pip.WebUI samples and can help in testing applications built with Pip.WebUI.

### Test data generators

Data generators allow to create predefined or random data objects, or update existing object with random changes.

Todo: Add code snippet to demonstrate use of data generators

### Mocks for REST resources

Connected controls in Pip.WebUI rely on certain server REST API. For testing purposes the RESTful API can replaced with mocked resources from this module.

Todo: Add code snippet to demonstrate use of mocked rest resources (how to plug standard and custom resources).

## Learn more about the module

- [User's guide](https://github.com/pip-webui/pip-webui-test/blob/master/doc/UsersGuide.md)
- [Online samples](http://webui.pipdevs.com/pip-webui-test/index.html)
- [API reference](http://webui-api.pipdevs.com/pip-webui-test/index.html)
- [Developer's guide](https://github.com/pip-webui/pip-webui-test/blob/master/doc/DevelopersGuide.md)
- [Changelog](https://github.com/pip-webui/pip-webui-test/blob/master/CHANGELOG.md)
- [Pip.WebUI project website](http://www.pipwebui.org)
- [Pip.WebUI project wiki](https://github.com/pip-webui/pip-webui/wiki)
- [Pip.WebUI discussion forum](https://groups.google.com/forum/#!forum/pip-webui)
- [Pip.WebUI team blog](https://pip-webui.blogspot.com/)

## <a name="dependencies"></a>Module dependencies

* [pip-webui-lib](https://github.com/pip-webui/pip-webui-lib): angular, angular-mocks, chance and other 3rd party libraries

## <a name="license"></a>License

This module is released under [MIT license](License) and totally free for commercial and non-commercial use.

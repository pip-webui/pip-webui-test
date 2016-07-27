# Pip.WebUI.Test User's Guide

## Contents
- [Installing](#install)
- [Using](#usage)
- [Questions and Bugs](#issues)

## <a name="install"></a> Installing

To install the module using Bower add dependency to **bower.json** file. 
If you use NPM add similar dependency to **package.json** file.
```javascript
{
  ...
  dependencies: {
    ...
    "pip-webui-test": "*"
    ...
  }
  ...
}
```

You can also install the module manually using bower:
```bash
bower install pip-webui-test
```

Of install it using npm:
```bash
npm install pip-webui-test
```

The last step is to load the module and its dependencies into your application:
```html
...
<link rel="stylesheet" href=".../pip-webui-lib.min.css"/>
...
<script src=".../pip-webui-lib.min.js"></script>
<script src=".../pip-webui-test.min.js"></script>
...
```

Keep in mind, that this is an optional module that is not included into pip-webui package.

## <a name="usage"></a> Using

TBD...

## <a name="issues"></a> Questions and Bugs

If you have any questions regarding the module, you can ask them using our 
[discussion forum](https://groups.google.com/forum/#!forum/pip-webui).

Bugs related to this module can be reported using [github issues](https://github.com/pip-webui/pip-webui-test/issues).

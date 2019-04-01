# Lilium CMS Article Validation

This repository is a plugin for [Lilium CMS](https://github.com/narcitymedia/lilium-cms) that performs custom validation on an article before it is published.

# How it works

## info.json

The `info.json` file contains information that will be used by Lilium CMS to register the plugin.
 - The `entry` key tells Lilium CMS what file is the entry point of the plugin.
 - The `identifier` key is the name that is use by Lilium CMS to identify the plugin. This name is also displayed in the CMS' plugin management interface
 
## entry.js

This file is the main plugin file.
 - It first requires the Lilium CMS hooks library by using the global `liliumroot` variable which represents the root directory of the CMS.
 - It defines a class named `ArticleValidation` which is an arbitrarily chosen name for the plugin. It then exports an instance of this class as a singleton.
 - The `ArticleValidation` class implements the `register(_c, info, done)` method and the `unregister(done)` method.
    - The `register()` method is fired when the plugin is enabled in the plugin management interface and when Lilium CMS starts up, provided that the plugin was enabled beforehand. The method uses the Lilium CMS `hooks` library to bind on the `article_validating` hook which is fired right after Lilium CMS has completed its validation of the article and before the article is published. The argument named `extra` is what the plugin receives from Lilium CMS.
    - The `unregister()` method is fired when the plugin is disabled. In this case, no cleanup actions are necessary so it immediately passes the control back to Lilium CMS.
 

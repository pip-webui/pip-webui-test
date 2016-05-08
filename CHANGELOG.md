<a name="1.0.0"></a>
### 1.0.0 (2015-12-02)

#### Features

* **Services**
pipTestAccount - Get account information
pipTestContent - Functions for generate some specific content data, such as checklist content, composite content,
                        location content, data in JSON format
pipTestEntity - Functions for generate pip-life entities, such as Goal, Post, Area, Event
pipTestUserParty - Function for generate User, Party, Contributors
pipTestDataSet - Static data, for example account data, server url
pipTestGeneral - General data generators

* **generators** Random data generators

* pipTestGeneral
* Functions:

- getObjectId(n, abd) - return random objectId. Parametrs: n - id length (default = 16), abd - a set of symbols
    (default = pipTestDataSet.ABCD constant)
- getOne(arr) - return random element from existing array. arr - array of element.
- getOneWord(n) - return one random word (as string). Default is a word with a random length 5-7 symbols.
    Can optionally specify a length by using the parameter - n.

* pipTestAccount
* Functions:
- getServerUrl() - return the string
- getSamplerAccount() - return object
- getTesterAccount() - return object

* pipTestEntity
* Functions:
- getEntity(propertyValues) - get object. Default is a object with property
    { "title", "type", "creator_id", "creator_name", "contribs", "tags", "id"}. Contribs contains only creator.
    Tags is empty.
    You can set their values for entity property with object propertyValues.
- setContrib(party, partyArray, minContribCount, maxContribCount) - add contributors to the party.
  partyArray - The array to query.
  minContribCount - The minimum number of party contributors to set.
  maxContribCount - The maximum number of party contributors to set.

- getOneArea(forUser, propertyValues) - get Area object. forUser is area creator.
     You can set their values for entity property with object propertyValues.
- getAreasCollection(count, forUser, propertyValues) - get collection of Areas objects. forUser is areas creator.
    count - collection length.
    You can set their values for entity property with object propertyValues.
- getOneGoal(forUser, propertyValues) - get Goal object. forUser is goal creator.
    You can set their values for entity property with object propertyValues.
- getGoalsCollection(count, forUser, propertyValues) - get collection of Goals objects. forUser is goals creator.
    count - collection length.
    You can set their values for entity property with object propertyValues.

* pipTestUserParty
* Functions:

- getOneUser(propertyValues)
- getPartyAccess(n, propertyValues)
- getParty(propertyValues)
- getConnection(party, propertyValues)
- getSettings(number)

* pipTestContent
* Functions:

- getCheckList(options)
    options = {size, onlyCheck, onlyUnCheck, optionTextType, optionLength}

* **datasets** Test datasets
* String and Object Constant

- ABCD - 'abcdefghijklmnopqrstuvwxyz'
- ABCD_CAPITALIZE - 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
- DIGIT - '0123456789'
- SIGN - ' .,;:-!?'

- SERVER_URL - get Server Url
- TESTER_ACCOUNT - get Account Object for testing {name, password, email, language, theme}
- SAMPLER_ACCOUNT - get Account Object for samples {name, password, email, language, theme}

- SETTINGS1 - get static settings
- SETTINGS2 - get static settings, second version
- EMPTY_USER  - get "Empty user" static object
- MANAGER_USER - get "Manager user" static object

* **mocks** Mock objects for common Pip.WebUI services

#### Breaking Changes
* 

#### Bug Fixes
No fixes in this version 

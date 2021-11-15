# Mobile Application Design and Development

## Project setup

### Step 1: Install package

```
npm install
```

### Step 2: Run serve
```
ionic serve
```

## Project build

### Option 1: Build Android
```
ionic capacitor add android
```

### Option 2: Build IOS
```
ionic capacitor add ios
```

## Description of the application

<h4>a) Design app screens - Basic details input screen</h4>
Note that users must be able to enter all of the following fields: 

- Property type (e.g. flat, house, bungalow) – required field <br>
- Bedrooms (e.g. studio, one, two, etc.) - required field <br>
- Date and time of adding the Property  (when the property have been added) – required field <br>
- Monthly rent price - required field <br>
- Furniture types (e.g. Furnished, Unfurnished, Part Furnished) - optional field <br>
- Notes – optional field <br>
- Name of the reporter – required fields <br>

<h4>b) Implement forms validation</h4>
<p>
Required field means that the user must enter something in this field otherwise they will get an error message.  Optional field means that the user can enter something if they wish but they will not get an error message if they don't enter anything.
The app will check the input and if the user doesn’t enter anything in one of the required fields the app should display an error message to the user.
Once the details have been accepted by the app (e.g. no required fields were missing) it should display the details back to the user for confirmation and allow them to go back and change any details that they wish.
</p>

<h4>c) Store, view and delete the basic details and check for duplicate events</h4>
<p>
All the details entered by the user should be stored on the device in a Web database. 
The user should be able to list all the details for all Properties entered in the app.
The user should be able to delete all the details from the database.
</p>

<h4>d) Search</h4>
<p>
The user should be able to search for a property.  At its simplest this could mean entering or selecting a property type and displaying the details of all information about that type. Ideally the user should be able to enter more details and search for a property that matches.  
</p>

<h4>e) Add a note input screen</h4>
<p>
The user may select one of the properties that they have entered and use this screen to enter information about something that is related to this property (e.g. condition, how close to schools, shops and public transportation).  It is up to you how complex or simple you want to make this.  At its most simple form the user can just enter a textual description of the property.  
The app should store all details entered on the device in a Web database.
It should be possible for a user to select a property and display the report for that property.
</p>

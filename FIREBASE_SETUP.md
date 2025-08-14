# Firebase Setup Guide for Sidra Project

This guide will help you set up Firebase authentication and Firestore database for the role-based content management system.

## Prerequisites

- Node.js and npm installed
- Firebase account (free tier available)

## Step 1: Create Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Create a project" or "Add project"
3. Enter project name (e.g., "sidra-cms")
4. Choose whether to enable Google Analytics (optional)
5. Click "Create project"

## Step 2: Enable Authentication

1. In your Firebase project, click "Authentication" in the left sidebar
2. Click "Get started"
3. Go to "Sign-in method" tab
4. Enable "Email/Password" authentication
5. Click "Save"

## Step 3: Create Firestore Database

1. In your Firebase project, click "Firestore Database" in the left sidebar
2. Click "Create database"
3. Choose "Start in test mode" for development (you can secure it later)
4. Select a location close to your users
5. Click "Enable"

## Step 4: Set Up Security Rules

In Firestore Database > Rules, replace the default rules with:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users can read/write their own user document
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    
    // Users can read/write articles based on their role
    match /articles/{articleId} {
      allow read: if request.auth != null;
      allow create: if request.auth != null && 
        get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'writer';
      allow update: if request.auth != null && (
        get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role in ['editor', 'editor-in-chief'] ||
        resource.data.authorId == request.auth.uid
      );
      allow delete: if request.auth != null && 
        get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'editor-in-chief';
    }
  }
}
```

## Step 5: Get Firebase Configuration

1. In your Firebase project, click the gear icon (⚙️) next to "Project Overview"
2. Select "Project settings"
3. Scroll down to "Your apps" section
4. Click the web icon (</>)
5. Register your app with a nickname (e.g., "sidra-web")
6. Copy the configuration object

## Step 6: Update Firebase Config

1. Open `src/config/firebase.js`
2. Replace the placeholder values with your actual Firebase configuration:

```javascript
const firebaseConfig = {
  apiKey: "your-actual-api-key",
  authDomain: "your-project-id.firebaseapp.com",
  projectId: "your-actual-project-id",
  storageBucket: "your-project-id.appspot.com",
  messagingSenderId: "your-actual-messaging-sender-id",
  appId: "your-actual-app-id"
};
```

## Step 7: Install Dependencies

Run the following command in your project directory:

```bash
npm install firebase
```

## Step 8: Test the Setup

1. Start your development server: `npm run dev`
2. Navigate to `/register` to create a test account
3. Try logging in with the created account
4. Check the Firebase console to see if users and data are being created

## User Roles and Permissions

### Writer (كاتب)
- Create new articles
- Edit their own articles
- Submit articles for review
- View their article history

### Editor (محرر)
- Review articles assigned to them
- Edit and improve articles
- Provide feedback to writers
- Submit edited articles for approval

### Editor-in-Chief (رئيس التحرير)
- Approve articles for publication
- Publish approved articles
- Assign articles to editors
- Manage user roles
- Access system-wide analytics

## Article Workflow

1. **Writer** creates a draft article
2. **Writer** submits article for review
3. **Editor-in-Chief** assigns article to an editor
4. **Editor** reviews and edits the article
5. **Editor-in-Chief** approves the edited article
6. **Editor-in-Chief** publishes the approved article

## Security Considerations

- All authentication is handled by Firebase
- Role-based access control is implemented at the application level
- Firestore security rules provide additional database-level protection
- User sessions are managed securely through Firebase Auth

## Troubleshooting

### Common Issues

1. **"Firebase: Error (auth/invalid-api-key)"**
   - Check that your API key is correct in the config file
   - Ensure the API key is from the correct Firebase project

2. **"Firebase: Error (auth/operation-not-allowed)"**
   - Make sure Email/Password authentication is enabled in Firebase Console

3. **"Firestore: Missing or insufficient permissions"**
   - Check your Firestore security rules
   - Ensure the user is authenticated

4. **"Firebase: Error (auth/user-not-found)"**
   - The user account doesn't exist
   - Check if the email is correct

### Getting Help

- Check Firebase documentation: [https://firebase.google.com/docs](https://firebase.google.com/docs)
- Review Firebase console for error logs
- Check browser console for detailed error messages

## Next Steps

After successful setup, you can:

1. Customize the UI and styling
2. Add more role-based features
3. Implement article categories and tags
4. Add file upload functionality
5. Create advanced analytics and reporting
6. Set up automated workflows and notifications 
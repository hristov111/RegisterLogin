# User Authentication System

A full-stack user authentication system featuring registration, login, and account management with comprehensive form validation and security features.

## 🚀 Features

- **User Registration & Login** - Secure authentication with email and password
- **Real-time Form Validation** - Client-side validation for all input fields
- **Custom CAPTCHA System** - Prevents automated bot submissions
- **Account Settings** - Update email and password after login
- **Password Requirements**
  - Minimum 8 characters
  - At least one uppercase letter
  - At least one special character
- **Security Features**
  - SQL injection prevention using PDO prepared statements
  - Input sanitization with `htmlspecialchars()` and `filter_input()`
  - Session management
  - Password hashing

## 🛠️ Technologies

### Frontend
- **JavaScript (ES6+)** - Modular architecture with import/export
- **HTML5 & CSS3** - Semantic markup and modern styling
- **Jest** - Unit testing for validation functions

### Backend
- **PHP** - Server-side logic with MVC pattern
- **MySQL** - Database management
- **PDO** - Secure database interactions

## 📋 Prerequisites

- [XAMPP](https://sourceforge.net/projects/xampp/) (Apache, MySQL, PHP)
- Node.js and npm (for running tests)
- Modern web browser

## ⚙️ Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/hristov111/RegisterLogin.git
   cd RegisterLogin
   ```

2. **Setup Database**
   - Start XAMPP and run Apache and MySQL
   - Open phpMyAdmin at `http://localhost/phpmyadmin`
   - Import the provided `database_schema.sql` file to create the database and table structure

3. **Configure Database Connection**
   - Open `register_handling/dbconnection.php`
   - Update credentials if needed (default: `localhost`, `root`, no password)

4. **Access the Application**
   - Place project in XAMPP's `htdocs` directory
   - Navigate to `http://localhost/RegisterLogin/register/index.php`

5. **Install Testing Dependencies (Optional)**
   ```bash
   npm install
   npm test
   ```

## 📁 Project Structure

```
RegisterLogin/
├── register/               # Registration/Login UI
│   ├── index.php          # Main entry point
│   ├── script.js          # Form handling and validation
│   ├── index.css          # Styling
│   └── captcha.html       # CAPTCHA component
├── register_handling/      # Backend logic (MVC)
│   ├── register.php       # Registration controller
│   ├── login.php          # Login controller
│   ├── register_model.php # Database operations
│   ├── register_view.php  # View layer
│   ├── dbconnection.php   # Database configuration
│   └── config_session.php # Session management
├── home/                   # Authenticated user area
│   ├── nav.php            # Navigation
│   └── settings.php       # Account settings
├── functions/              # Reusable validation functions
│   └── functions.js
├── tests/                  # Jest unit tests
└── new-email-handling/     # Email update functionality
└── new-password-handling/  # Password update functionality
```

## 🧪 Testing

The project includes Jest tests for validation functions:

```bash
npm test
```

Tests cover:
- Email validation
- Password strength validation
- Name validation (first/last)
- CAPTCHA generation
- Password equality checks

## 🔒 Security Notes

- **Database Credentials**: For production, move credentials to environment variables
- **Password Storage**: Passwords should be hashed using `password_hash()` (ensure this is implemented in your PHP code)
- **HTTPS**: Always use HTTPS in production
- **Input Validation**: Both client and server-side validation implemented

## 💡 Key Implementation Details

### Frontend Validation
- Modular JavaScript with ES6 imports/exports
- Real-time feedback with error/success states
- Custom CAPTCHA with refresh functionality

### Backend Architecture
- **MVC Pattern**: Separation of concerns (Model, View, Controller)
- **Prepared Statements**: All database queries use PDO with bound parameters
- **Session Management**: Secure session handling for authenticated users

### Form Flow
1. User fills registration/login form
2. Client-side validation provides immediate feedback
3. CAPTCHA verification required
4. Server-side validation and database operations
5. Session created on successful authentication
6. Redirect to home page

## 🤝 Contributing

Feel free to fork this project and submit pull requests. For major changes, please open an issue first to discuss what you would like to change.

## 📧 Contact

GitHub: [@hristov111](https://github.com/hristov111)

---

*This project demonstrates full-stack development skills including frontend JavaScript, backend PHP, database design, security best practices, and comprehensive testing.*

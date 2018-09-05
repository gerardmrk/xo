package xo

type UserID string

type RegistrationForm struct {
	email      string
	username   string
	password   string
	agreeToTOS bool
}

type AccountSettings struct {
	email         string
	username      string
	password      string
	mobile        string
	mfaEnabled    bool
	emailVerified bool
}

type ProfileSettings struct {
	name          string
	bio           string
	isPublic      bool
	websiteURL    string
	profilePicURL string
	bannerPicURL  string
}

type AppPreferences struct {
	notificationsEnabled bool
}

type UserSettings struct {
	account     AccountSettings
	profile     ProfileSettings
	preferences AppPreferences
}

type IdentityService interface {
	RequestEmailVerification(email string) error
	RequestPasswordReset(usernameOrEmail string) error
	ResetPassword(code string, newPassword string) error
	VerifyCode(code, scope string) (bool, error)
	Register(form RegistrationForm) (UserID, error)
	CheckUsernameUniqueness(username string) (bool, error)
	// authenticated methods
	GetSettings(userID UserID) (UserSettings, error)
	ChangePassword(userID UserID, oldPswd string, newPswd string) error
}

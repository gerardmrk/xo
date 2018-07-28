package xo

// User represents a client user of xo
type User interface {
}

type UserInfo struct {
}

// OpenIDStandardClaims covers all standard claims as listed in
// https://openid.net/specs/openid-connect-basic-1_0.html
type OpenIDStandardClaims struct {
	Sub               string
	Name              string
	GivenName         string
	FamilyName        string
	MiddleName        string
	Nickname          string
	PreferredUsername string
}

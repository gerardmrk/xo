package identityservice

import (
	"github.com/gerardmrk/xo"
)

type IdentityService struct {
}

func (svc *IdentityService) Register(form xo.RegistrationForm) {

}

func (svc *IdentityService) GetSettings() xo.UserSettings {
	return xo.UserSettings{}
}

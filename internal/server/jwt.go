package server

import (
	"factuurhub/internal/conf"

	"github.com/cristalhq/jwt/v3"
	"github.com/rs/zerolog/log"
)

var (
	jwtSigner   jwt.Signer
	jwtVerifier jwt.Verifier
)

func jwtSetup(conf conf.Config) {
	var err error
	key := []byte(conf.JwtSecret)

	jwtSigner, err = jwt.NewSignerHS(jwt.HS256, key)
	if err != nil {
		log.Panic().Err(err).Msg("Error creating JWT signer")
	}

	jwtVerifier, err = jwt.NewVerifierHS(jwt.HS256, key)
	if err != nil {
		log.Panic().Err(err).Msg("Error creating JWT verifier")
	}
}

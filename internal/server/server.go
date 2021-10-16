package server

import (
	"factuurhub/internal/conf"
	"factuurhub/internal/database"
	"factuurhub/internal/store"
)

func Start(cfg conf.Config) {
	store.SetDBConnection(database.NewDBOptions(cfg))

	router := setRouter()
	router.Run(":8080")
}

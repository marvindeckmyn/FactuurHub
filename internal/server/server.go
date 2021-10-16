package server

import (
	"factuurhub/internal/database"
	"factuurhub/internal/store"
)

func Start() {
	store.SetDBConnection(database.NewDBOptions())

	router := setRouter()
	router.Run(":8080")
}

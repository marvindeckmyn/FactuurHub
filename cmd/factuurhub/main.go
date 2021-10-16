package main

import (
	"factuurhub/internal/conf"
	"factuurhub/internal/server"
)

func main() {
	server.Start(conf.NewConfig())
}

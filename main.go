package main

import (
	"github.com/gin-gonic/gin"
	"net/http"
)

func main() {
	router := gin.Default()

	api := router.Group("/api")
	{
		api.GET("/hello", func(ctx *gin.Context) {
			ctx.JSON(200, gin.H{"msg": "world"})
		})
	}

	router.NoRoute(func(ctx *gin.Context) { ctx.JSON(http.StatusNotFound, gin.H{}) })
	router.Run(":8080")
}
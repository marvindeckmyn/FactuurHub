package server

import (
	"net/http"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func setRouter() *gin.Engine {
	router := gin.Default()
	router.Use(cors.Default())

	router.RedirectTrailingSlash = true

	api := router.Group("/api")
	{
		api.POST("/signup", signUp)
		api.POST("/signin", signIn)
	}

	authorized := api.Group("/")
	authorized.Use(authorization)
	{
		authorized.GET("/invoices", indexInvoices)
		authorized.GET("/invoices/:id", indexInvoice)
		authorized.POST("/invoices", createInvoice)
		authorized.PUT("/invoices/:id", updateInvoice)
		authorized.DELETE("/invoices/:id", deleteInvoice)
	}

	router.NoRoute(func(ctx *gin.Context) { ctx.JSON(http.StatusNotFound, gin.H{}) })

	return router
}

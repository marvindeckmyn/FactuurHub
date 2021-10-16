package store

import (
	"time"

	"github.com/rs/zerolog/log"
)

type Invoice struct {
	ID                            int
	Factuurnummer                 string  `binding:"required"`
	Factuurdatum                  string  `binding:"required"`
	OndernemingNaam               string  `binding:"required"`
	OndernemingAdres              string  `binding:"required"`
	OndernemingBtwNummer          string  `binding:"required"`
	OndernemingBankrekeningNummer string  `binding:"required"`
	Vervaldatum                   string  `binding:"required"`
	Goederen                      string  `binding:"required"`
	Subtotaal                     float64 `binding:"required"`
	BtwPercentage                 int     `binding:"required"`
	BtwPrijs                      float64 `binding:"required"`
	Totaal                        float64 `binding:"required"`
	CreatedAt                     time.Time
	ModifiedAt                    time.Time
	UserID                        int `json:"-"`
}

func AddInvoice(user *User, invoice *Invoice) error {
	invoice.UserID = user.ID
	_, err := db.Model(invoice).Returning("*").Insert()
	if err != nil {
		log.Error().Err(err).Msg("Error inserting new invoice")
	}
	return err
}

package store

import "time"

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

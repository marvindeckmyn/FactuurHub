package store

import (
	"time"

	"github.com/go-pg/pg/v10/orm"
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
	Betalingsstatus               int     `binding:"required"`
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

func FetchUserInvoices(user *User) error {
	err := db.Model(user).Relation("Invoices", func(q *orm.Query) (*orm.Query, error) {
		return q.Order("id ASC"), nil
	}).Select()
	if err != nil {
		log.Error().Err(err).Msg("Error fetching user's posts")
	}
	return err
}

func FetchInvoice(id int) (*Invoice, error) {
	invoice := new(Invoice)
	invoice.ID = id
	err := db.Model(invoice).WherePK().Select()
	if err != nil {
		log.Error().Err(err).Msg("Error fetching invoice")
		return nil, err
	}
	return invoice, nil
}

func UpdateInvoice(invoice *Invoice) error {
	_, err := db.Model(invoice).WherePK().UpdateNotZero()
	if err != nil {
		log.Error().Err(err).Msg("Error updating invoice")
	}
	return err
}

func DeleteInvoice(invoice *Invoice) error {
	_, err := db.Model(invoice).WherePK().Delete()
	if err != nil {
		log.Error().Err(err).Msg("Error deleting invoice")
	}
	return err
}

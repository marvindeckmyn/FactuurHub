package main

import (
	"fmt"

	"github.com/go-pg/migrations/v8"
)

func init() {
	migrations.MustRegisterTx(func(db migrations.DB) error {
		fmt.Println("creating table invoices...")
		_, err := db.Exec(`CREATE TABLE invoices(
			id SERIAL PRIMARY KEY,
			factuurnummer TEXT NOT NULL,
			factuurdatum TEXT NOT NULL,
			onderneming_naam TEXT NOT NULL,
			onderneming_adres TEXT NOT NULL,
			onderneming_btw_nummer TEXT NOT NULL,
			onderneming_bankrekening_nummer TEXT NOT NULL,
			vervaldatum TEXT NOT NULL,
			goederen TEXT NOT NULL,
			subtotaal DOUBLE PRECISION NOT NULL,
			btw_percentage INT NOT NULL,
			btw_prijs DOUBLE PRECISION NOT NULL,
			totaal DOUBLE PRECISION NOT NULL,
			created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
			modified_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
			user_id INT references users ON DELETE CASCADE
			)`)
		return err
	}, func(db migrations.DB) error {
		fmt.Println("dropping table invoices...")
		_, err := db.Exec(`DROP TABLE invoices`)
		return err
	})
}

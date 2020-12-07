/*
 * Speichert eine Kontaktliste in local storage des Browers.
 * 
 */

class KontakteSpeicher {
    /**
     * Lädt die Daten aus dem local storage in das '_kontakte'-Array.
     */
	constructor() {
		this._kontakte = [];
		
		if (typeof(Storage) !== "undefined") {
			try {
				var i;
				
				this.laden();
				for (i = 0; i < this._kontakte.length; ++i) {
					var p = this._kontakte[i]; 
					console.log('Kontakt: ' + p.toString());
				}
			} catch (error) {
				alert(error);
			}
		} else {
			alert("Sorry, your browser does not support web storage…");
		}	
	}

	/*
	 * Methoden zum Zugriff auf die Kontaktliste
	 */

     /**
      * Liefert den Kontakt mit der gegebenen id.
      */
	findeKontaktZuId(id) {
		this.laden();
		var kontakt = this._kontakte[id];
		
		return kontakt;
	}
	
     /**
      * Liefert alle Kontakte als Array.
      */
     findeAlle() {
		this.laden();
		var ergebnis = [];
		var i, j = 0;
		
		for (i = 0; i < this._kontakte.length; ++i) {
			if (this._kontakte[i].id !== -1) {
				ergebnis[j++] = this._kontakte[i];
			}
		}
				
		ergebnis.sort(
			function(p1, p2) { 
				return p1.id - p2.id;
			}
		);

		return ergebnis;
	}

     /**
      * Liefert ein Array von Kontakten, die zu den übergebenen Filter-
      * und Sortierkriterien passen.
      */
     findeZuFilterUndSortiere(name, ort, sortierung) {
		this.laden();
		var ergebnis = [];
		var i, j = 0;
		
		for (i = 0; i < this._kontakte.length; ++i) {
			if (this._kontakte[i].id !== -1) {
				if (this.filter(this._kontakte[i], name, ort)) { 
					ergebnis[j++] = this._kontakte[i];
				}
			}
		}
				
		this.sortiereKontaktListe(ergebnis, sortierung);
		return ergebnis;
	}

    /**
     * Speichert einen neuen Kontakt und vergibt dabei eine ID für den Kontakt.
     * Als ID wird die nächste freie Index-Position im Kontakte-Array verwendet.
     */
	neuerKontakt(kontakt) {
		this.laden();
		var i;
		
		for (i = 0; i < this._kontakte.length; ++i) {
			if (this._kontakte[i].id == -1) {
				break;
			}
		}
		kontakt.id = i;
		this._kontakte[kontakt.id] = kontakt;
		this.speichern();
	}

    /**
     * Ersetzt den bestehenden Kontakt durch den übergebenen und 
     * speichert.
     */
	aktualisiereKontakt(kontakt) {
		this.laden();
		if (this.findeKontaktZuId(kontakt.id) !== "undefined") {
			this._kontakte[kontakt.id] = kontakt;
			this.speichern();
		}
	};

    /**
     * Löscht den Kontakt mit der ID 'id', falls er existiert.
     * Der Kontakt wird nur logisch gelöscht, d.h. die Index-Position im Array 
     * wird mit -1 (=frei) markiert.
     */
    loescheKontakt(id) {
		this.laden();
		if (this.findeKontaktZuId(id) !== "undefined") {
			this._kontakte[id].id = -1;
			this.speichern();
		}		
	}

    /* 
	 * Laden und Speichern in local storage
	 */
	speichern() {
		localStorage.setItem('kontakte', JSON.stringify(this._kontakte));
	}

	laden() {
		let kontakteLS = localStorage.kontakte;

		if (kontakteLS) {
			// String in Objekt-array umwandeln
			let array = JSON.parse(kontakteLS);
		
			// geladenene Objekte in Kontakt-Objekte umwandeln
			// => dann hat jedes Objekt z.B. eine pruefe-Methode
			for (let i = 0; i < array.length; ++i) {
				this._kontakte[i] = new Kontakt(
					array[i]._id,
					array[i]._name,
					array[i]._email,
					array[i]._ort,
					array[i]._plz,
					array[i]._strasse);
			}
		} else {
			// leeren LocalStorage-Eintrag erzeugen
			this.speichern();
		}		
		console.log('kontakte in LocalStorage: ', kontakteLS);
	}

	/*
	 * Hilfsfunktionen
	 */
	filter(adresse, name, ort) {
		var ergebnis = true;
		
		if (name != "" || ort != "") {
			if (name != "") {
				var indexName = adresse.name.indexOf(name);
	
				ergebnis = (indexName == 0);
			}
			if (ort != "") {
				var indexOrt = adresse.ort.indexOf(ort);
				
				ergebnis = ergebnis && (indexOrt == 0);
			}
		}
		return ergebnis;
	};	
	
	sortiereKontaktListe(liste, sortierung) {
		var sortierFunktion;

		if (sortierung == 'Name') {
			sortierFunktion = function(p1, p2) {
				return -p1.name.localeCompare(p2.name);
			};
		} else if (sortierung == 'Ort') {
			sortierFunktion = function(p1, p2) {
				return -p1.ort.localeCompare(p2.ort);
			};
		} else if (sortierung == 'PLZ') {
			sortierFunktion = function(p1, p2) {
				return -(parseInt(p1.plz) - parseInt(p2.plz));
			};
		} 
		liste.sort(sortierFunktion);
	}

}

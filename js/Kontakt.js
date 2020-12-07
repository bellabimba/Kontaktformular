/*
 * Beschreibt einen Kontakt.
 * Ein Kontakt kann sich selbst prüfen (pruefe()) und 
 * in einen String umwandeln (toString()).
 */
class Kontakt  {
	
	constructor(id, name, email, ort, plz, strasse) {
		this._id = id;
		this._name = name;
		this._email = email;
		this._ort = ort;
		this._plz = plz;
		this._strasse = strasse;
	}

    /**
     * Prüft den Kontakt und wirft eine Exception bei einem Fehler.
     * Der Aufrufer-Code sollte eine catch-Klausel vorsehen, 
     * um den Fehler zu behandeln.
     */
	pruefe() {
        if (this.name.trim() === "") {
            throw "Der Name darf nicht leer sein!";
        } else if (this.email.trim() === "") {
            throw "Die E-Mail-Adresse darf nicht leer sein!";
        } else if (this.plz.trim() === "") {
            throw "Die Postleitzahl darf nicht leer sein!";
        } else if (this.ort.trim() === "") {
            throw "Der Ort darf nicht leer sein!";
        } else if (this.strasse.trim() === "") {
            throw "Die Strasse darf nicht leer sein!";
        } else {
            if (this.plz != parseInt(this.plz) || this.plz <= 0) {
                throw "Die Postleitzahl muss eine Zahl > 0 sein!";
            } else if (!this.validateEmail(this.email)) {
				throw "Die E-Mail-Adresse besitzt kein gültiges Format!";
			}
        }
    }

    /**
     * Prüft die übergebene E-Mail-Adresse und liefert false bei einem Fehler,
     * sonst true.
     */
	validateEmail(email) {
    	var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    	return re.test(email);
	}

    /**
     * Liefert die String-Repräsentation des Kontakts (für Debugging-Zwecke)
     */
    toString() {
    	return "{" + this.id + ", " +
    		this.name + ", " + 
    		this.email + ", " + 
    		this.ort + ", " + 
    		this.plz + ", " + 
    		this.strasse + "}";
    }

    get id() {
		return this._id;
	}
	get name() {
		return this._name;
	}
	get email() {
		return this._email;
	}
	get ort() {
		return this._ort;
	}
	get plz() {
		return this._plz;
	}
	get strasse() {
		return this._strasse;
	}
	set id(wert) {
		this._id = wert;
	}
	set name(wert) {
		this._name = wert;
	}
	set email(wert) {
		this._email = wert;
	}
	set ort(wert) {
		this._ort = wert;
	}
	set plz(wert) {
		this._plz = wert;
	}
	set strasse(wert) {
		this._strasse = wert;
	}
}

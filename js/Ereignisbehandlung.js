 var kontakteSpeicher = new KontakteSpeicher();

/**
 * Belegt die Kontakte-Tabelle gemäß der Filter- und Sortierparameter
 */
function kontakteSuchen() {
    belegeKontakteTabelle();
}

/**
 * Bereitet den Bearbeiten-Dialog für die Neuanlage eines Kontakts oder die
 * Bearbeitung eines bestehenden Kontakts vor.
 * - Titel und Fieldset-Legende setzen
 * - Disabled-Eigenschaft für Namensfeld setzen 
 * - Kontaktwerte vorbelegen (nur bei Aktualisierung)
 */
function kontaktBearbeitenInit(id) {
    var newText = "Kontakt anlegen";
    var bearbeitenText = "Kontakt bearbeiten";
    
    document.getElementById('idSaver').value = id;
    if (id === '-1') {
        // Kontakt anlegen
        document.getElementById("titleID").innerHTML = newText;
        document.getElementById("legendID").innerHTML = newText;
        document.getElementById("nameID").disabled = false;
    } else {
        // gültige ID gegeben, Kontakt bearbeiten
        document.getElementById("titleID").innerHTML = bearbeitenText;
        document.getElementById("legendID").innerHTML = bearbeitenText;

        var kontakt = kontakteSpeicher.findeKontaktZuId(id);

        document.getElementById("nameID").disabled = true;
        document.getElementById("nameID").value = kontakt.name;
        document.getElementById("emailID").value = kontakt.email;
        document.getElementById("ortID").value = kontakt.ort;
        document.getElementById("plzID").value = kontakt.plz;
        document.getElementById("strasseID").value = kontakt.strasse;
    }
}

/**
 * Liest die Daten aus dem Bearbeiten-Dialog und speichert den Kontakt über den KontakteSpeicher.
 * Vor dem Speichern wird eine Prüfung der Kontaktdaten vorgenommen (s. Kontakt.pruefe()).
 * Ist der Kontakt nicht valide, so wird eine Fehlermeldung angezeigt.
 * Nach dem Speichern (neu anlegen bzw. aktualisieren) über den KontakteSpeicher wird zum Suchdialog 
 * verzweigt. 
 */
    

function kontaktSpeichern() {
    var id = document.getElementById('idSaver').value;
    
    var kontakt = null;
    
    if (id === '-1'){
        var kontakt = new Kontakt();
    } else {
        kontakt = kontakteSpeicher.findeKontaktZuId(id);
    }
        kontakt.name = document.getElementById("nameID").value;
        kontakt.email = document.getElementById("emailID").value;
        kontakt.ort = document.getElementById("ortID").value;
        kontakt.plz = document.getElementById("plzID").value;
        kontakt.strasse = document.getElementById("strasseID").value;
        
    try {
        kontakt.pruefe();
        if (id === '-1'){
            kontakteSpeicher.neuerKontakt(kontakt);
        } else {
            kontakteSpeicher.aktualisiereKontakt(kontakt);
        }
            document.location.href = "Suchdialog.html";
    }
    catch (error){
            alert(error)
        }
    schliessen();
    }



/**
 * Löscht den Kontakt mit der ID 'id' nach vorheriger Bestätigung durch den Benutzer.
 */
function kontaktLoeschen(id) {
	/* hier bitte Code ergänzen */
    var c = confirm("Sind sie sicher, dass sie diesen Kontakt löschen möchten?");
    if (c == true){
    let kontakt = kontakteSpeicher.findeKontaktZuId(id);
    kontakteSpeicher.loescheKontakt(id);
    document.location.href = "Suchdialog.html";
    } else {
        
    }
    
}

/**
 * Hauptfunktion zur Belegung der Kontakte-Tabelle.
 * Liest die Kontakte aus dem KontakteSpeicher gemäß der vom Benutzer vorgegebenen 
 * Filterung und Sortierung und belegt die Tabelle mithilfe der Funktion belegeZeile().
 */
function belegeKontakteTabelle() {
	try {
		console.log("belegeKontakteTabelle");
	
		var table = document.getElementById("kontakteTabelle");
		var kontakte = kontakteSpeicher.findeZuFilterUndSortiere(
			document.getElementById('nameID').value,
			document.getElementById('ortID').value,
			document.getElementById('sortierungID').value);
		var i;

		while (table.rows.length > 1) {
			table.deleteRow(1);
		}
		for (i = 0; i < kontakte.length; ++i) {
			belegeZeile(table, kontakte[i]);
		}
	} catch (error) {
		console.log(error);
		alert(error);
	}
}

/**
 * Erzeugt eine neue Zeile in der Tabelle 'table'. Die Zeile stellt
 * die Daten aus dem Kontakt 'kontakt' dar.
 * Ereignisbehandlung:
 * - Bei Klick auf den Bearbeiten-Button wird die Seite "KontaktBearbeiten.html?id=xxx"
 *   aufgerufen. xxx ist die ID des zu bearbeitenden Kontakts
 * - Bei Klick auf den Löschen-Button wird die Funktion kontaktLoeschen(id) aufgerufen.
 */
function belegeZeile(table, kontakt) {
	console.log("belegeZeile: Kontakt = " + kontakt.toString());

	var tr = table.insertRow(1); // Überschrift überspringen	
	var td  = tr.insertCell(0);
	
   	var inhalt  = document.createTextNode(kontakt.id);
   	td.appendChild(inhalt);
   	td.hidden = "true";
   	
	td  = tr.insertCell(1);
   	inhalt = document.createTextNode(kontakt.name);
   	td.appendChild(inhalt);

	td  = tr.insertCell(2);
   	inhalt = document.createTextNode(kontakt.email);
   	td.appendChild(inhalt);

	td  = tr.insertCell(3);
   	inhalt  = document.createTextNode(kontakt.ort);
   	td.appendChild(inhalt);

	td  = tr.insertCell(4);
   	inhalt  = document.createTextNode(kontakt.plz);
   	td.appendChild(inhalt);

	td  = tr.insertCell(5);
   	inhalt  = document.createTextNode(kontakt.strasse);
   	td.appendChild(inhalt);

	td  = tr.insertCell(6);	
	// edit button
	var button = document.createElement('button');
	button.onclick = "kontaktBearbeitenInit(kontakt.id)"
		
	var image = document.createElement('img');
	image.src = "images/edit.png";
	image.width = "15";
	image.height = "15";
	button.appendChild(image);
	td.appendChild(button);
	// delete button
	button = document.createElement('button');
	button.onclick = function() { 
		kontaktLoeschen(kontakt.id);
	};
	image = document.createElement('img');
	image.src = "images/trash.png";
	image.width = "15";
	image.height = "15";
	button.appendChild(image);
	td.appendChild(button);
}


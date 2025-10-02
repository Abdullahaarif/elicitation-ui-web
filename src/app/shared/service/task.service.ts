import { Injectable } from "@angular/core";
import { Task } from "../model/task";
import { Group } from "../model/group.enum";
import { Language } from "../model/language.enum";

@Injectable({
    providedIn: "root",
})
export class TaskService {
    loadedTasks: Task[] = [];
    chosenLanguage: Language = Language.ENGLISH;

    germanTasks = [
        { title: "Wert ändern", description: "Tragen Sie den Wert 100 in die Zelle F9 ein.", group: Group.P },
        { title: "Wert löschen", description: "Löschen Sie den Inhalt der Zelle E8.", group: Group.P },
        { title: "Werte löschen", description: "Löschen Sie die Inhalte der Zellen J7-J11.", group: Group.A },
        {
            title: "Zwei Werte addieren",
            description: "Berechnen Sie die Summe der Zellen I8 und J8 in Zelle K8.",
            group: Group.A,
        },
        {
            title: "Spalte einfügen",
            description: "Fügen Sie eine neue Spalte zwischen den Spalten B und C ein.",
            group: Group.A,
        },
        {
            title: "Spalte entfernen",
            description: "Entfernen Sie die gesamte Spalte B aus der Tabelle.",
            group: Group.A,
        },
        { title: "Zellen verschieben", description: "Verschieben Sie die Zellen A15-C15 nach H3.", group: Group.A },
        {
            title: "Mehrere Werte addieren",
            description: "Berechnen Sie die Summe der Zellen E7-E11 in Zelle E13.",
            group: Group.B,
        },
        {
            title: "Werte formatieren",
            description: "Formatieren Sie die Werte in den Zellen C7-C11 als Euro-Beträge mit zwei Nachkommastellen.",
            group: Group.B,
        },
        {
            title: "Zellen umrahmen",
            description: "Fügen Sie einen einfachen Rahmen um die Zellen A15-C15 hinzu.",
            group: Group.B,
        },
        {
            title: "Formatierung übertragen",
            description: "Übertragen Sie die Formatierung der Zelle A13 auf die Zellen E13-J13.",
            group: Group.B,
        },
        {
            title: "Tortendiagramm erstellen",
            description: "Erstellen Sie ein Tortendiagramm aus den Werten der Zellen E8-J8.",
            group: Group.B,
        },
        {
            title: "Balkendiagramm erstellen",
            description: "Erstellen Sie ein Balkendiagramm aus den Werten der Zellen C7-C11.",
            group: Group.B,
        },
        {
            title: "Serie fortführen",
            description: "Führen Sie die Serie von Werten in Zeile 6 (E6-J6) bis zur Zelle M6 fort.",
            group: Group.B,
        },
        {
            title: "Werte transponieren",
            description:
                "Transponieren Sie die Namen in Zellen A7-A11 nach Zeile 17 (d.h. übertragen Sie die in Spalte A untereinander stehenden Namen nebeneinander stehend in Zeile 17).",
            group: Group.B,
        },
        {
            title: "Daten sortieren",
            description:
                "Sortieren Sie die Daten in den Zeilen 7-11 alphabetisch nach den Mitarbeiternamen in Spalte A.",
            group: Group.C,
        },
        {
            title: "Mehrere Summen bilden",
            description: "Berechnen Sie für jeden Monat die Summe aller Mitarbeiterstunden in den Zellen E13-J13.",
            group: Group.C,
        },
        {
            title: "Formel konstruieren",
            description:
                "Berechnen Sie für jeden Mitarbeiter den Brutto-Stundensatz in Spalte D, indem Sie die Arbeitgeberkostenpauschale aus Zelle C15 auf den Netto-Stundensatz in Spalte C aufschlagen.",
            group: Group.C,
        },
        {
            title: "Bedingte Formatierung",
            description:
                "Definieren Sie eine bedingte Formatierungsregel für die Zellen C7-11, so dass Werte über 200 in rot und andere in grün angezeigt werden.",
            group: Group.C,
        },
        {
            title: "Werte multiplizieren",
            description:
                "Berechnen Sie die Gesamtkosten für Mitarbeiter Smith in Zelle L7, indem Sie seine Gesamtstunden über alle Monate in Zeile 7 addieren und mit seinem Netto-Stundensatz in Zelle C7 multiplizieren.",
            group: Group.C,
        },
    ];

    englishTasks = [
    // NEW Question 0 - Tutorial question
    { 
        title: "Delete Item Price Tutorial", 
        description: "Q0: How would you delete the item price of PRD-6647?", 
        group: Group.W  // Using W group like other warmup questions
    },
        // Warmup questions (Group W)
    { 
        title: "Calculate Net Subtotal", 
        description: "Q1: How would you calculate the Net Subtotal by adding the Total Prices of all invoiced items?", 
        group: Group.W 
    },
    { 
        title: "Calculate Total Price for Apples", 
        description: "Q2: How would you calculate the Total Price for Apples by multiplying their Quantity and Item Price?", 
        group: Group.W 
    },
    
    // Main questions (Group A) - in specified order
    { 
        title: "Calculate Gross Subtotal", 
        description: "Q3: How would you calculate the Gross Subtotal by adding 15% tax to the Net Subtotal?", 
        group: Group.A 
    },
    { 
        title: "Calculate Orange Juice Quantity", 
        description: "Q4: How would you calculate the Quantity of Orange Juice?", 
        group: Group.A 
    },
    { 
        title: "Identify Maximum Discount", 
        description: "Q5: How would you identify the maximum of all Discounts, and display it in cell J4?", 
        group: Group.A 
    },
    { 
        title: "Calculate Average Item Price", 
        description: "Q6: How would you calculate the average of all Item Prices, round the result to the nearest whole number, and display it in cell J5?", 
        group: Group.A 
    },
    { 
        title: "Calculate Packaging Fee", 
        description: "Q7: How would you calculate the Packaging Fee by multiplying the Delivery Fee with the maximum of all Quantities and the average of all Discounts, and rounding the result to the nearest whole number?", 
        group: Group.A 
    },
    { 
        title: "Calculate Chocolate Total Price", 
        description: "Q8: Assuming there is a \"get one free\" deal for Chocolate, how would you calculate its Total Price?", 
        group: Group.A 
    },
    { 
        title: "Calculate Total Price with Discount", 
        description: "Q9: How would you calculate the Total Price for each individual item by multiplying its Quantity and Item Price and applying the Discount?", 
        group: Group.A 
    },
    { 
        title: "Set Conditional Delivery Fee", 
        description: "Q10: How would you set the Delivery Fee to 10 € if the Gross Subtotal is less than 100 €, or 20 € otherwise?", 
        group: Group.A 
    },
    { 
        title: "Calculate Invoice Amount", 
        description: "Q11: How would you calculate the Invoice Amount by subtracting the Customer Credit from the Grand Total?", 
        group: Group.A 
    },
    { 
        title: "Calculate Express Fee", 
        description: "Q12: How would you calculate the Express Fee (in the Invoice) by multiplying the Gross Subtotal with the Express Rate (in the Inventory)?", 
        group: Group.A 
    },
    { 
        title: "Calculate Invoice with Holiday Discount", 
        description: "Q13: How would you calculate the Invoice Amount by subtracting the Customer Credit and the Holiday Discount (in the Inventory) from the Grand Total?", 
        group: Group.A 
    },
    { 
        title: "Determine Wine Item Price", 
        description: "Q14: How would you determine the Item Price of Wine (in the Invoice) by using its Item No. to look up its Unit Price in the Inventory?", 
        group: Group.A 
    },
    { 
        title: "Calculate Detergent Price with Surcharge", 
        description: "Q15: How would you calculate the Item Price of Laundry Detergent (in the Invoice) by adding the Low Stock Surcharge (in the Inventory) to its Unit Price if its Stock is lower than 5?", 
        group: Group.A 
    },
    { 
        title: "List Low Stock Items", 
        description: "Q16: How would you list the Item No's of all items whose Stock is lower than 5 next to \"Low stock\" in the Inventory?", 
        group: Group.A 
    },
    { 
        title: "List Unknown Items", 
        description: "Q17: How would you list the Item No's of all invoiced items that are not included in the Inventory under \"Unknown items\" in the Invoice?", 
        group: Group.A 
    },
];

    public initData(language: Language): Task[] {
        this.chosenLanguage = language;
        console.log("Chosen Language: ", this.chosenLanguage);
        const loadedTasks: Task[] = [];
        let id = 1;
        const resets = 0;
        let tasks = [];

        if (this.chosenLanguage == Language.GERMAN) {
            tasks = this.germanTasks;
        } else {
            tasks = this.englishTasks;
        }

        for (const task of tasks) {
            loadedTasks.push(new Task(id, task.title, task.description, task.group, resets, this.chosenLanguage));
            id++;
        }

        return this.randomiseByGroup(loadedTasks);
    }

    public randomiseByGroup(tasks: Task[]): Task[] {
    // For English, return tasks in the exact order they're defined
    if (this.chosenLanguage === Language.ENGLISH) {
        // Simply assign task numbers sequentially
        tasks.forEach((task, index) => {
            task.taskNumber = index + 1;
        });
        console.log("Loaded Tasks (English - No randomization): ", tasks);
        this.loadedTasks = tasks;
        return tasks;
    }
    
    // Keep existing randomization logic for German
    const groupP: Task[] = tasks.filter((task) => task.group === Group.P);
    const groupA: Task[] = tasks.filter((task) => task.group === Group.A);
    const groupB: Task[] = tasks.filter((task) => task.group === Group.B);
    const groupC: Task[] = tasks.filter((task) => task.group === Group.C);

    const shuffleArray = (array: Task[]) => {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    };

    shuffleArray(groupP);
    shuffleArray(groupA);
    shuffleArray(groupB);
    shuffleArray(groupC);

    const shuffledList: Task[] = groupP.concat(groupA, groupB, groupC);

    shuffledList.forEach((task, index) => {
        task.taskNumber = index + 1;
    });
    console.log("Loaded Tasks (German - Randomized): ", shuffledList);
    this.loadedTasks = shuffledList;

    return shuffledList;
}
}

import { Component, OnInit } from "@angular/core";
import { Language } from "../../shared/model/language.enum";
import { Router } from "@angular/router";
import { TaskService } from "../../shared/service/task.service";
import { DataStorageService } from "../../shared/service/data.storage.service";
import { MessageService } from "../../shared/service/message.service";

@Component({
    selector: "app-demographics",
    templateUrl: "./demographics.component.html",
    styleUrls: ["./demographics.component.scss"],
})
export class DemographicsComponent implements OnInit {
    language: Language = Language.ENGLISH;

    protected readonly Language = Language;

    // Updated variables for new questions
    spreadsheetExperience: string = "";
    tabletExperience: string = "";
    stylusExperience: string = "";
    writingHand: string = "";
    scriptDirection: string = "";
    ageGroup: string = "";
    gender: string = "";

    constructor(
        private router: Router,
        private taskService: TaskService,
        private dataStorageService: DataStorageService,
        private messageService: MessageService,
    ) {}

    ngOnInit(): void {
        this.language = this.taskService.chosenLanguage;
    }

    checkFormCompletion(): boolean {
        // Check if all required fields are filled
        if (
            this.spreadsheetExperience === "" ||
            this.tabletExperience === "" ||
            this.stylusExperience === "" ||
            this.writingHand === "" ||
            this.scriptDirection === "" ||
            this.ageGroup === "" ||
            this.gender === ""
        ) {
            return false;
        }
        return true;
    }

    saveData(): void {
        const data = {
            spreadsheetExperience: this.spreadsheetExperience,
            tabletExperience: this.tabletExperience,
            stylusExperience: this.stylusExperience,
            writingHand: this.writingHand,
            scriptDirection: this.scriptDirection,
            ageGroup: this.ageGroup,
            gender: this.gender,
        };

        this.dataStorageService.saveData(
            `21_demographics.json`,
            new Blob([JSON.stringify(data, null, 2)], { type: "application/json" }),
        );
    }

    clickPreviousPage() {
        this.router.navigate(["/questionnaire/18"]);
    }

    clickNextPage() {
        if (this.checkFormCompletion()) {
            this.saveData();
            this.nextPage();
        } else {
            this.messageService.notCompletedForm(this.language);
        }
    }

    clickSkipTask() {
        this.dataStorageService.saveData(
            `21_demographics_skip.json`,
            new Blob([JSON.stringify({ skipped: true }, null, 2)], { type: "application/json" }),
        );
        this.nextPage();
    }

    nextPage() {
        this.router.navigate(["/acknowledgement"]);
    }
}
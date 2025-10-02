import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Task } from "../../shared/model/task";
import { TaskService } from "../../shared/service/task.service";
import { Language } from "../../shared/model/language.enum";
import { DataStorageService } from "../../shared/service/data.storage.service";
import { MessageService } from "../../shared/service/message.service";

@Component({
    selector: "app-questionnaire",
    templateUrl: "./questionnaire.component.html",
    styleUrls: ["./questionnaire.component.scss"],
})
export class QuestionnaireComponent implements OnInit {
    currentTask: Task | undefined;

    // Updated question
    question1_GERMAN = "Wie fanden Sie diese Aufgabe?";
    question1_ENGLISH = "How did you find this task?";

    // Options for the question
    options_GERMAN = ["Sehr einfach", "Einfach", "Ok", "Schwierig", "Sehr schwierig"];
    options_ENGLISH = ["Very easy", "Easy", "Ok", "Difficult", "Very difficult"];

    formQuestion1 = "";

    startTime: Date | undefined;

    protected readonly Language = Language;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private taskService: TaskService,
        private dataStorageService: DataStorageService,
        private messageService: MessageService,
    ) {}

    ngOnInit(): void {
        const taskNumber = +this.route.snapshot.params["taskNumber"];
        this.currentTask = this.taskService.loadedTasks?.find((task) => task.taskNumber === taskNumber);

        if (this.currentTask) {
            console.log("Current Task: ", this.currentTask.id);
        } else {
            console.log("Task not found");
        }

        this.startTime = new Date();
    }

    checkFormCompletion(): boolean {
        // Always return true to make it optional
        return true;
    }

    clickExitStudy() {
        this.router.navigate(["/demographics"]);
    }

    clickPreviousPage() {
        this.router.navigate(["/task/" + this.currentTask!.taskNumber.toString()]);
    }

    clickNextPage(): void {
        // No validation needed - questionnaire is optional
        this.saveData();
        this.nextPage();
    }

    nextPage(): void {
        if (this.currentTask?.taskNumber === this.taskService.loadedTasks.length) {
            this.router.navigate(["/demographics"]);
        } else {
            this.router.navigate(["/task/" + (this.currentTask!.taskNumber + 1).toString()]);
        }
    }

    saveData(): void {
        const questionnaireData = {
            id: this.currentTask?.id,
            question1: this.currentTask?.language === Language.GERMAN ? this.question1_GERMAN : this.question1_ENGLISH,
            answer1: this.formQuestion1 === "" ? "Not answered" : this.formQuestion1,
            startTime: this.startTime,
            endTime: new Date(),
        };

        this.dataStorageService.saveData(
            `${this.currentTask?.taskNumber}_questionnaire_task${this.currentTask?.id}.json`,
            new Blob([JSON.stringify(questionnaireData, null, 2)], { type: "application/json" }),
        );
    }

    // Helper method to get options based on language
    getOptions(): string[] {
        return this.currentTask?.language === Language.GERMAN ? this.options_GERMAN : this.options_ENGLISH;
    }
}
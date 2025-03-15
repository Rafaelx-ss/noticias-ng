import { Component, OnInit, signal, ViewChild } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Table, TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { RatingModule } from 'primeng/rating';
import { InputTextModule } from 'primeng/inputtext';
import { TextareaModule } from 'primeng/textarea';
import { SelectModule } from 'primeng/select';
import { RadioButtonModule } from 'primeng/radiobutton';
import { InputNumberModule } from 'primeng/inputnumber';
import { DialogModule } from 'primeng/dialog';
import { TagModule } from 'primeng/tag';
import { InputIconModule } from 'primeng/inputicon';
import { IconFieldModule } from 'primeng/iconfield';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { Product, ProductService } from '../service/product.service';
import { User, UserService } from '../service/user.service';
import { PasswordModule } from 'primeng/password';

interface Column {
    field: string;
    header: string;
    customExportHeader?: string;
}

interface ExportColumn {
    title: string;
    dataKey: string;
}

@Component({
    selector: 'app-userscrud',
    standalone: true,
    imports: [
        CommonModule,
        TableModule,
        FormsModule,
        ButtonModule,
        RippleModule,
        ToastModule,
        ToolbarModule,
        RatingModule,
        InputTextModule,
        TextareaModule,
        SelectModule,
        RadioButtonModule,
        InputNumberModule,
        DialogModule,
        TagModule,
        InputIconModule,
        IconFieldModule,
        ConfirmDialogModule,
        PasswordModule
    ],
    template: `
        <p-toolbar styleClass="mb-6">
            <ng-template #start>
                <p-button label="New" icon="pi pi-plus" severity="secondary" class="mr-2" (onClick)="openNew()" />
                <p-button severity="secondary" label="Delete" icon="pi pi-trash" [outlined]="true" (onClick)="deleteSelectedUsers()" [disabled]="!selectedUsers || !selectedUsers.length" />
            </ng-template>

            <ng-template #end>
                <p-button label="Export" icon="pi pi-upload" severity="secondary" (onClick)="exportCSV()" />
            </ng-template>
        </p-toolbar>

        <p-table
            #dt
            [value]="users()"
            [rows]="10"
            [columns]="cols"
            [paginator]="true"
            [globalFilterFields]="['name', 'email', 'created_at', 'updated_at']"
            [tableStyle]="{ 'min-width': '75rem' }"
            [(selection)]="selectedUsers"
            [rowHover]="true"
            dataKey="id"
            currentPageReportTemplate="Showing {first} to {last} of {totalRecords} users"
            [showCurrentPageReport]="true"
            [rowsPerPageOptions]="[10, 20, 30]"
        >
            <ng-template pTemplate="caption">
                <div class="flex items-center justify-between">
                    <h5 class="m-0">Crud de usuarios</h5>
                    <p-iconfield>
                        <p-inputicon styleClass="pi pi-search" />
                        <input pInputText type="text" (input)="onGlobalFilter(dt, $event)" placeholder="Search..." />
                    </p-iconfield>
                </div>
            </ng-template>
            <ng-template pTemplate="header">
                <tr>
                    <th style="width: 3rem">
                        <p-tableHeaderCheckbox />
                    </th>
                    <th pSortableColumn="id" style="min-width:16rem">
                        id 
                        <p-sortIcon field="id" />
                    </th>
                    <th pSortableColumn="name" style="min-width: 8rem">
                        name 
                        <p-sortIcon field="name" />
                    </th>
                    <th pSortableColumn="email" style="min-width: 8rem">
                        email 
                        <p-sortIcon field="email" />
                    </th>
                    <th pSortableColumn="created_at" style="min-width:10rem">
                        created_at
                        <p-sortIcon field="created_at" />
                    </th>
                    <th pSortableColumn="updated_at" style="min-width: 12rem">
                        updated_at
                        <p-sortIcon field="updated_at" />
                    </th>
                    <th style="min-width: 12rem"></th>
                </tr>
            </ng-template>
            <ng-template pTemplate="body" let-user>
                <tr>
                    <td style="width: 3rem">
                        <p-tableCheckbox [value]="user" />
                    </td>
                    <td style="min-width: 12rem">{{ user.id }}</td>
                    <td style="min-width: 16rem">{{ user.name }}</td>
                    <td>{{ user.email }}</td>
                    <td>{{ user.created_at }}</td>
                    <td>{{ user.updated_at }}</td>
                    <td>
                        <p-button icon="pi pi-pencil" class="mr-2" [rounded]="true" [outlined]="true" (onClick)="editUser(user)" />
                        <p-button icon="pi pi-trash" severity="danger" [rounded]="true" [outlined]="true" (onClick)="deleteUser(user)" />
                    </td>
                </tr>
            </ng-template>
        </p-table>

        <p-dialog [(visible)]="userDialog" [style]="{ width: '450px' }" header="User Details" [modal]="true">
            <ng-template pTemplate="content">
                <div class="flex flex-col gap-6">   
                    <div>
                        <label for="name" class="block font-bold mb-3">Name</label>
                        <input type="text" pInputText id="name" [(ngModel)]="user.name" required autofocus [style]="{'width': '100%'}" />
                        <small class="text-red-500" *ngIf="submitted && !user.name">El nombre es requerido.</small>
                    </div> 
                    <div>
                        <label for="email" class="block font-bold mb-3">Email</label>
                        <input type="email" pInputText id="email" [(ngModel)]="user.email" required [style]="{'width': '100%'}" />
                        <small class="text-red-500" *ngIf="submitted && !user.email">El email es requerido.</small>
                    </div>
                    <div>
                        <label for="password1" class="block text-surface-900 dark:text-surface-0 font-medium text-xl mb-2">Contraseña</label>
                        <p-password id="password1" [(ngModel)]="user.password" placeholder="Contraseña" [toggleMask]="true" styleClass="mb-8" [fluid]="true"></p-password>
                        <small class="text-red-500" *ngIf="submitted && !user.password">La contraseña es requerida.</small>
                    </div>
                </div>
            </ng-template>

            <ng-template pTemplate="footer">
                <p-button label="Cancel" icon="pi pi-times" (onClick)="hideDialog()" [text]="true" />
                <p-button label="Save" icon="pi pi-check" (onClick)="saveUser()" />
            </ng-template>
        </p-dialog>

        <p-confirmdialog [style]="{ width: '450px' }" />
        <p-toast />
    `,
    providers: [MessageService, UserService, ConfirmationService]
})
export class Userscrud implements OnInit {
    userDialog: boolean = false;
    productDialog: boolean = false;

    users = signal<User[]>([]);

    user!: User;

    selectedUsers!: User[] | null;

    submitted: boolean = false;

    statuses!: any[];

    @ViewChild('dt') dt!: Table;

    exportColumns!: ExportColumn[];

    cols!: Column[];

    constructor(
        private userService: UserService,
        private messageService: MessageService,
        private confirmationService: ConfirmationService
    ) {}

    exportCSV() {
        this.dt.exportCSV();
    }

    ngOnInit() {
        this.loadDemoData();
    }

    loadDemoData() {
        this.userService.getUsersData().subscribe((data) => {
            this.users.set(data);
        });

        this.statuses = [
            { label: 'INSTOCK', value: 'instock' },
            { label: 'LOWSTOCK', value: 'lowstock' },
            { label: 'OUTOFSTOCK', value: 'outofstock' }
        ];

        this.cols = [
            { field: 'id', header: 'ID' },
            { field: 'name', header: 'Nombre' },
            { field: 'email', header: 'Email' },
            { field: 'password', header: 'Contraseña' },
            { field: 'created_at', header: 'Fecha de creación' },
            { field: 'updated_at', header: 'Fecha de actualización' }
        ];

        this.exportColumns = this.cols.map((col) => ({ title: col.header, dataKey: col.field }));
    }

    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    }

    openNew() {
        this.user = {};
        this.submitted = false;
        this.userDialog = true;
    }

    editUser(user: User) {
        this.user = { ...user };
        this.userDialog = true;
    }

    deleteSelectedUsers() {
        this.confirmationService.confirm({
            message: '¿Estás seguro de querer eliminar los usuarios seleccionados?',
            header: 'Confirmar',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.users.set(this.users().filter((val) => !this.selectedUsers?.includes(val)));
                this.selectedUsers = null;
                this.messageService.add({
                    severity: 'success',
                    summary: 'Exitoso',
                    detail: 'Usuarios eliminados',
                    life: 3000
                });
            }
        });
    }

    hideDialog() {
        this.userDialog = false;
        this.submitted = false;
    }

    deleteUser(user: User) {
        this.confirmationService.confirm({
            message: '¿Estás seguro de querer eliminar el usuario ' + user.name + '?',
            header: 'Confirmar',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.users.set(this.users().filter((val) => val.id !== user.id));
                this.user = {};
                this.messageService.add({
                    severity: 'success',
                    summary: 'Exitoso',
                    detail: 'Usuario eliminado',
                    life: 3000
                });
            }
        });
    }

    findIndexById(id: string): number {
        let index = -1;
        for (let i = 0; i < this.users().length; i++) {
            if (this.users()[i].id === id) {
                index = i;
                break;
            }
        }

        return index;
    }

    createId(): string {
        let id = '';
        var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        for (var i = 0; i < 5; i++) {
            id += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return id;
    }

    getSeverity(status: string) {
        switch (status) {
            case 'INSTOCK':
                return 'success';
            case 'LOWSTOCK':
                return 'warn';
            case 'OUTOFSTOCK':
                return 'danger';
            default:
                return 'info';
        }
    }

    async saveUser() {
        this.submitted = true;

        if (!this.user.name?.trim() || !this.user.email?.trim() || !this.user.password?.trim()) {
            this.messageService.add({
                severity: 'warn',
                summary: 'Advertencia',
                detail: 'Todos los campos son obligatorios',
                life: 3000
            });
            return;
        }

        try {
            const response = this.user.id 
                ? await this.userService.updateUser(this.user.id, this.user)
                : await this.userService.createUser(this.user);

            if (response) {
                this.refreshUserData();
                this.userDialog = false;
                this.messageService.add({
                    severity: 'success',
                    summary: 'Exitoso',
                    detail: this.user.id ? 'Usuario actualizado' : 'Usuario creado',
                    life: 3000
                });
            } else {
                this.handleError(this.user.id ? 'actualizar' : 'crear');
            }
        } catch (error) {
            console.error('Error al guardar el usuario:', error);
            this.handleError(this.user.id ? 'actualizar' : 'crear');
        }
    }

    private refreshUserData() {
        this.users.set([]);
        this.loadDemoData();
    }

    private handleError(action: string) {
        this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: `Error al ${action} el usuario`,
            life: 3000
        });
    }
}

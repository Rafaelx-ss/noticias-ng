import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

// Component 1
@Component({
    selector: 'app-root',
    standalone: true,
    imports: [RouterModule],
    template: `<router-outlet></router-outlet>`
})
export class AppComponent {}

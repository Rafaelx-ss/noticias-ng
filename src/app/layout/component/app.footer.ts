import { Component } from '@angular/core';

@Component({
    standalone: true,
    selector: 'app-footer',
    template: `<div class="layout-footer">
        Noticias "El Pepe" by
        <a href="https://github.com/Rafaelx-ss" target="_blank" rel="noopener noreferrer" class="text-primary font-bold hover:underline">Rafael Solis,</a>
        <a href="https://github.com/JosePK0" target="_blank" rel="noopener noreferrer" class="text-primary font-bold hover:underline">Pepe Pool,</a>
        <a href="https://github.com/KevDom0317" target="_blank" rel="noopener noreferrer" class="text-primary font-bold hover:underline">Kevin Padilla</a>

    </div>`
})
export class AppFooter {}

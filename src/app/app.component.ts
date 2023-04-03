import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CiudadService } from './services/ciudad/ciudad.service';
import { PaisesService } from './services/paises/paises.service';
import { PersonaService } from './services/persona/persona.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'fullcrud_front';
  personaForm!: FormGroup;
  paises: any;
  ciudades:any;
  personas:any;

  constructor(
    public fb: FormBuilder,
    public ciudadService: CiudadService,
    public paisesService: PaisesService,
    public personaService: PersonaService
  ) {}

  ngOnInit(): void {
    this.personaForm = this.fb.group({
      namePersona: ['', Validators.required],
      lastNamePersona: ['', Validators.required],
      agePersona: ['', Validators.required],
      emailPersona: ['', Validators.required],
      pais: ['', Validators.required],
      ciudad: ['', Validators.required],
    });

    this.paisesService.getAllPaises().subscribe(resp => {
      this.paises = resp;
    },
      error => console.error(error)

    );

    this.personaService.getAllPersonas().subscribe(resp=>{
      this.personas = resp;
    },
      error => {console.error(error)}
    );

    this.personaForm.get('pais')?.valueChanges.subscribe(value=>{
      this.ciudadService.getAllCiudadesByPais(value.id).subscribe(resp=>{
        this.ciudades = resp
      },
      error=>{console.error(error)}
      );
    })


  }

  guardar():void{
    this.personaService.savePersona(this.personaForm.value).subscribe(resp=>{
      this.personaForm.reset();
    },
    error=>{console.error(error)}
    )
  }

}

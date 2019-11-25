import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { ClienteService, Estado } from "../cliente.service";
import { Observable, Subscription } from "rxjs";
import { AbstractControl, FormArray, FormBuilder, FormGroup, Validators } from "@angular/forms";
import { faMinus, faPlus, faSearch, faSpinner } from "@fortawesome/free-solid-svg-icons";
import { finalize } from "rxjs/operators";

@Component({
  selector: 'app-cliente-form',
  templateUrl: './cliente-form.component.html',
  styleUrls: ['./cliente-form.component.scss']
})
export class ClienteFormComponent implements OnInit, OnDestroy {

  faSearch = faSearch;
  faSpinner = faSpinner;
  faPlus = faPlus;
  faMinus = faMinus;
  isSearchingCep = false;
  edit = false;
  routeSub: Subscription;
  form: FormGroup;
  estados: Observable<Estado[]>;
  tiposTelefone = ['CELULAR', 'RESIDENCIAL', 'COMERCIAL'];

  constructor(private router: Router,
              private route: ActivatedRoute,
              private formBuilder: FormBuilder,
              private clienteService: ClienteService) {
  }

  // acesso para objetos que indicam erro na template
  get emails() {
    return this.form.get('emails') as FormArray;
  }

  get telefones() {
    return this.form.get('telefones') as FormArray;
  }

  ngOnInit() {
    this.subscribeToRouteParam();
    this.getEstados();
    this.createFormGroup();
  }

  ngOnDestroy() {
    this.routeSub.unsubscribe();
  }

  onSubmit() {
    console.log(this.form);
    if (!this.form.valid) {
      this.markAsTouchedDirty(this.form);
    } else {
      this.submit();
    }
  }

  public consultaCep(): void {
    this.isSearchingCep = true;
    this.clienteService.consultaCep(this.form.get('endereco.cep').value)
      .pipe(finalize(() => this.isSearchingCep = false))
      .subscribe(
        (endereco) => this.patchEndereco(endereco)
      );
  }

  public addEmail(): void {
    const formArray = (<FormArray>this.form.get('emails'));
    const control = this.formBuilder.group({
      id: null,
      email: [null, [Validators.required, Validators.email]]
    });
    formArray.push(control);
  }

  public removeEmail(i): void {
    const formArray = <FormArray>this.form.get('emails');
    formArray.removeAt(i);
  }

  public addTelefone(): void {
    const formArray = (<FormArray>this.form.get('telefones'));
    const control = this.formBuilder.group({
      id: null,
      tipo: 'CELULAR',
      numero: [null, Validators.required]
    });
    formArray.push(control);
  }

  public removeTelefone(i): void {
    const formArray = <FormArray>this.form.get('telefones');
    formArray.removeAt(i);
  }

  private submit() {
    if (this.form.value.id) {
      this.update();
    } else {
      this.save();
    }
  }

  private save(): void {
    this.clienteService.saveCliente(this.form.value).subscribe(
      (_) => {
        this.clienteService.listUpdated.next();
        this.router.navigate(['../'], {relativeTo: this.route})
      },
      (err) => console.error(err)
    );
  }

  private update(): void {
    this.clienteService.updateCliente(this.form.value).subscribe(
      (_) => this.router.navigate(['../'], {relativeTo: this.route}),
      (err) => console.error(err)
    );
  }

  private markAsTouchedDirty(formGroup: FormGroup | FormArray) {
    Object.keys(formGroup.controls).forEach(campo => {
      console.log(campo);
      const control = formGroup.get(campo);
      control.markAsTouched();
      control.markAsDirty();
      if (control instanceof FormGroup || control instanceof FormArray) {
        this.markAsTouchedDirty(control);
      }
    });
  }

  private getEstados(): void {
    this.estados = this.clienteService.getEstados();
  }

  private createFormGroup() {
    this.form = this.formBuilder.group({
      id: [null],
      nome: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
      cpf: [null, [Validators.required, Validators.minLength(11)]],
      endereco: this.formBuilder.group({
        cep: [null, [Validators.required, Validators.minLength(8)]],
        logradouro: [null, Validators.required],
        bairro: [null, Validators.required],
        cidade: [null, Validators.required],
        uf: [null, Validators.required],
        complemento: [null]
      }),
      emails: this.edit
        ? this.formBuilder.array([])
        : this.formBuilder.array([
          this.formBuilder.group({
            id: null,
            email: [null, [Validators.required, Validators.email]]
          })
        ]),
      telefones: this.edit
        ? this.formBuilder.array([])
        : this.formBuilder.array([
          this.formBuilder.group({
            id: null,
            tipo: 'CELULAR',
            numero: [null, Validators.required],
          })
        ])
    });
  }

  private subscribeToRouteParam() {
    this.routeSub = this.route.params.subscribe(
      (params: any) => {
        const id = params['id'];
        if (!id) return;
        this.edit = true;
        this.clienteService.getCliente(id).subscribe(
          (response) => this.patchForm(response)
        );
      }
    );
  }

  private patchForm(cliente) {
    console.log('Cliente ', cliente);
    this.form.patchValue({
      id: cliente.id,
      nome: cliente.nome,
      cpf: cliente.cpf,
      endereco: {
        cep: cliente.endereco.cep,
        logradouro: cliente.endereco.logradouro,
        bairro: cliente.endereco.bairro,
        cidade: cliente.endereco.cidade,
        uf: cliente.endereco.uf,
        complemento: cliente.endereco.complemento
      },
    });
    this.patchEmails(cliente.emails);
    this.patchTelefones(cliente.telefones);
  }

  private patchTelefones(telefones) {
    console.log('emails ', telefones);
    const formArray = this.form.get('telefones') as FormArray;

    for (let telefone of telefones) {
      formArray.push(this.formBuilder.group({
        id: [telefone.id],
        tipo: [telefone.tipo],
        numero: [telefone.numero, Validators.required]
      }));
    }
  }

  private patchEmails(emails) {
    console.log('emails ', emails);
    const formArray = this.form.get('emails') as FormArray;

    for (let email of emails) {
      formArray.push(this.formBuilder.group({
        id: [email.id],
        email: [email.email, [Validators.required, Validators.email]]
      }));
    }
  }

  private patchEndereco(endereco) {
    this.form.patchValue({
      endereco: {
        logradouro: endereco.logradouro,
        complemento: endereco.complemento,
        bairro: endereco.bairro,
        cidade: endereco.localidade,
        uf: endereco.uf
      }
    });
  }
}

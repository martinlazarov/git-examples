
export function markFormAsPristine(form: NgForm) {
    Object.keys(form.controls).forEach(control => {
        form.controls[control].markAsPristine();
    });
}

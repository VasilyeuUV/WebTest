jQuery(document).ready(function ($) {
    const calc = new Calculator('#body__div-calc',);
    calc.field
        .on('focus click', function () {
            $(this)[0].setSelectionRange(20, 20);
        })
        /*    .on('change', function () {
               if ($field.val() === '') {
                $field.val(0);
              } 
            })*/
        /*     .on('keyup', function (e) {
              calc.onKeyUp(e);
            }) */
        .bind("keyup", function (e) {
            calc.onKeyUp(e);
        })
        .inputFilter(function (value) {
            return /^-?\d*[.,]?\d*$/.test(value);
        });

});


class Calculator {

    constructor(parent) {
        this._numberOfDigits = 12;
        this._arg1 = 0;
        this._arg2 = 0;
        this._operation = "";
        this._signs =
            [
                ['7', '8', '9', '&#247;'],
                ['4', '5', '6', '&#215;'],
                ['1', '2', '3', '&#8722;'],
                ['0', '&#177;', ',', '+'],
                ['CLEAR', '='],
            ];

        this.initialize(parent);
        this.field = $('#div-calc__input-result');
    }

    //getResult() { return this._result; }            

    initialize(parent) {
        const table = '\
        <table class="div-calc__table-keys">\
        <thead><tr><th colspan="4">\
        <input id="div-calc__input-result" type="text" value="0" placeholder="0">\
        </th></tr> </thead>\
        <tbody></tbody> \
        </table>';
        $(parent).append(table);

        for (let i = 0; i < this._signs.length; i++) {
            addTableRow(i, this._signs[i]);
        }
        $(".div-calc__table-keys").find('tr:last td')
            .attr('colspan', '3');
        $("#div-calc__input-result").attr('maxlength', this._numberOfDigits);

        function addTableRow(n_row, calc_row) {
            let row = '<tr id="calc-row' + n_row + '">';
            for (let i = 0; i < calc_row.length; i++) {
                let classExt = !isNaN(+calc_row[i]) || calc_row[i] == ','
                    ? "number-button"
                    : "func-button";
                row += '<td class="calc-button ' + classExt + '">' + calc_row[i] + '</td>';
            }
            row += '</tr>';
            $('.div-calc__table-keys').append(row);
        }
    }

    onKeyUp(e) {
        this.showActiveButton(e);
        console.log(e.key);

        switch (e.which) {
            case 16: return;
            case 188:
            case 110:
            case 190:
            case 191:
                e.key = ".";
                let s = this.field.val();
                this.field.val(s.replace(',', '.'))
                if (this._arg2 === undefined) {
                    this._arg2 = this.field.val();
                }
                return;
        }


        if (+e.key) {
            if (this._arg2 === undefined) {
                this._arg2 = e.key;
                this.displayResult(e.key);
            }
            return;
        }
        this._arg2 = this.field.val();

        // !!!!!!!
        switch (e.key) {
            case ".":
            case ",":
                this.field.val().replace(',', '.')
                break;
            case "=":
                this.execute(this._operation);
                this.displayResult();
                this.clear();
                break;
            case "Delete":
                this.clear();
                this.displayResult();
                break;
            /*       case "±":	
                    this.displayResult(-this.field.val()); 
                    return;  */
            case "Backspace":
                break;
            default:
                /*         if (this._operation === undefined){
                          this._arg2 = this.field.val(); 
                          this._operation = "";
                        } */
                this.execute(this._operation);
                this._operation = e.key;
                this._arg2 = undefined;
                break;
        }
    }

    clear() {
        this._operation = "";
        this._arg1 = 0;
        this._arg2 = 0;
    }

    execute(sign) {
        if (sign === undefined)
            return;
        console.log("################################");
        this._arg1 = parseFloat(this._arg1);
        console.log("arg1 = " + this._arg1);
        console.log("sign: " + sign);
        this._arg2 = parseFloat(this._arg2);
        console.log("arg2 = " + this._arg2);
        switch (sign) {
            case "": this._arg1 = this._arg2; break;
            case "/": this._arg1 /= this._arg2; break;
            case "*": this._arg1 *= this._arg2; break;
            case "-": this._arg1 -= this._arg2; break;
            case "+": this._arg1 += this._arg2; break;
        }
        console.log("rez = " + this._arg1);
        this.displayResult();
    }


    displayResult(arg = this._arg1) {
        this.field.val(arg);
    }

    showActiveButton(e) {
        let btnValue;
        switch (e.which) {
            case 13: btnValue = "="; break;
            case 46: btnValue = "CLEAR"; break;
            case 106: btnValue = "×"; break;
            case 109: btnValue = "−"; break;
            case 111: btnValue = "÷"; break;
            case 188:
            case 110:
            case 190:
            case 191: btnValue = ","; break;
            default: btnValue = e.key; break;
        }
        let btn = $('.calc-button').filter(function () {
            return $(this).text() === btnValue;
        });
        btn.addClass('active');
        setTimeout(function () {
            btn.removeClass('active');
        }.bind(this), 200);
    }




} // class end



// Restricts input for each element in the set of matched elements to the given inputFilter.
(function ($) {
    $.fn.inputFilter = function (inputFilter) {
        return this.on("change input keyup keydown mousedown mouseup select contextmenu drop", function () {
            if (inputFilter(this.value)) {
                this.oldValue = this.value;
                this.oldSelectionStart = this.selectionStart;
                this.oldSelectionEnd = this.selectionEnd;
            } else if (this.hasOwnProperty("oldValue")) {
                this.value = this.oldValue;
                this.setSelectionRange(this.oldSelectionStart, this.oldSelectionEnd);
            } else {
                this.value = "0";
            }
        });
    };
}(jQuery));
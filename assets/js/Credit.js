input_credit_card = function(input)
{
    var format_and_pos = function(char, backspace)
    {
        var start = 0;
        var end = 0;
        var pos = 0;
        var separator = " ";
        var value = input.value;

        if (char !== false)
        {
            start = input.selectionStart;
            end = input.selectionEnd;

            if (backspace && start > 0) // handle backspace onkeydown
            {
                start--;

                if (value[start] == separator)
                { start--; }
            }
            // To be able to replace the selection if there is one
            value = value.substring(0, start) + char + value.substring(end);

            pos = start + char.length; // caret position
        }

        var d = 0; // digit count
        var dd = 0; // total
        var gi = 0; // group index
        var newV = "";
        var groups = /^\D*3[47]/.test(value) ? // check for American Express
        [4, 6, 5] : [4, 4, 4, 4];

        for (var i = 0; i < value.length; i++)
        {
            if (/\D/.test(value[i]))
            {
                if (start > i)
                { pos--; }
            }
            else
            {
                if (d === groups[gi])
                {
                    newV += separator;
                    d = 0;
                    gi++;

                    if (start >= i)
                    { pos++; }
                }
                newV += value[i];
                d++;
                dd++;
            }
            if (d === groups[gi] && groups.length === gi + 1) // max length
            { break; }
        }
        input.value = newV;

        if (char !== false)
        { input.setSelectionRange(pos, pos); }
    };

    input.addEventListener('keypress', function(e)
    {
        var code = e.charCode || e.keyCode || e.which;

        // Check for tab and arrow keys (needed in Firefox)
        if (code !== 9 && (code < 37 || code > 40) &&
        // and CTRL+C / CTRL+V
        !(e.ctrlKey && (code === 99 || code === 118)))
        {
            e.preventDefault();

            var char = String.fromCharCode(code);

            // if the character is non-digit
            // OR
            // if the value already contains 15/16 digits and there is no selection
            // -> return false (the character is not inserted)

            if (/\D/.test(char) || (this.selectionStart === this.selectionEnd &&
            this.value.replace(/\D/g, '').length >=
            (/^\D*3[47]/.test(this.value) ? 15 : 16))) // 15 digits if Amex
            {
                return false;
            }
            format_and_pos(char);
        }
    });
    
    // backspace doesn't fire the keypress event
    input.addEventListener('keydown', function(e)
    {
        if (e.keyCode === 8 || e.keyCode === 46) // backspace or delete
        {
            e.preventDefault();
            format_and_pos('', this.selectionStart === this.selectionEnd);
        }
    });
    
    input.addEventListener('paste', function()
    {
        // A timeout is needed to get the new value pasted
        setTimeout(function(){ format_and_pos(''); }, 50);
    });
    
    input.addEventListener('blur', function()
    {
    	// reformat onblur just in case (optional)
        format_and_pos(this, false);
    });
    //append card number to virtual card
    input.addEventListener('keyup', function(){
        document.getElementById('card-number').innerHTML = this.value
    })
};

input_credit_card(document.getElementById('credit-card'));

//append others input
document.getElementById('card-name').addEventListener('keyup', function() {
    document.querySelector('.name-holder').innerHTML = this.value

});
document.getElementById('exp-month').addEventListener('keyup', function() {
    document.querySelector('.exp-month').innerHTML = this.value

});
document.getElementById('exp-year').addEventListener('keyup', function() {
    document.querySelector('.exp-year').innerHTML = this.value

});


//Time Left!
function startTimer(duration, display) {
    let timer = duration, munutes, seconds;
    setInterval(function (){

        minutes = parseInt(timer / 60, 10);
        seconds = parseInt(timer % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds

        display.textContent = minutes + ":" + seconds;
        if (--timer < 0 ) {
            timer = duration;
        }

    }, 1000 );
}
window.onload = function () {
    let Minutes = 60 * 3,
    display = document.querySelector('#time');
    startTimer(Minutes, display)
};


document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('.form'); // Substitua '.my-form' pelo seletor correto do seu formulário

    form.addEventListener('submit', (event) => {
        // Verifique se o formulário é válido (todos os campos obrigatórios estão preenchidos)
        if (form.checkValidity()) {
            event.preventDefault(); // Impede o envio do formulário
            alert('Seu pedido foi feito com sucesso');
            // Não redireciona para outra página
        } else {
            event.preventDefault();
            alert('Preencha corretamente o formulário antes de finalizar a compra');
        }
    });
});

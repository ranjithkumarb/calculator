var canvas = document.getElementById('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

document.body.style.overflow = 'hidden';
document.body.style.margin = '0px';
document.body.style.background = '#000000';
var btn = [];
var stage = new createjs.Stage('canvas');
var btnHolder = new createjs.Container();
var textHolder = new createjs.Container();
var textBg = new createjs.Shape();
textBg.graphics.beginFill("#FFFFFF").drawRoundRect(0, 0,230, 50, 10);
var cancelHolder = new createjs.Container();
var cancelBg = new createjs.Shape();
cancelBg.graphics.beginFill("#FF1919").drawRoundRect(0, 0,230, 50, 10);
var shape =  [];
var img = new createjs.Bitmap("img/radiobtn_on.png");
img.id = "radiobtn_on";
var txtButton = [];
var numberText = [];
var cancelText = [];
var operatorText = [];
var count = 0;
var dotUsed = 0;
var operatorSelected = 0;
var number1 = 0;
var number2 = 0;

//txtButton.textBaseline = "middle";
img.x = 250;
img.y = 0;
img.height = 20;
img.width = 20;

btnHolder.height = 100;
btnHolder.width = 450;
onButtonCreation();

 function onButtonCreation(){
    var currentX = 0;
    var currentY = 40;
    var nextX = 60;
    var nextY = 60;
    numberText = new createjs.Text();
    numberText.text = "0";
    numberText.font = "bold 24px Cambria";
    numberText.color = "#000000";
    numberText.name = "label";
    numberText.textAlign = "end"; 
    numberText.maxWidth = 220;

    cancelText = new createjs.Text();
    cancelText.text = "C";
    cancelText.font = "bold 24px Cambria";
    cancelText.color = "#FFFFFF";
    cancelText.name = "label";
    cancelText.textAlign = "center";

    operatorText = new createjs.Text();
    operatorText.font = "bold 10px Cambria";
    operatorText.color = "#000000";
    operatorText.name = "label";
    operatorText.textAlign = "center";

	textHolder.x = 80;
    textHolder.y = -50;
	textBg.x = -80;
	textBg.y = 30;
	numberText.x = 140;
    numberText.y = 40;
    operatorText.x = 140;
    operatorText.y = 30; 

    cancelHolder.x = 80;
    cancelHolder.y = 140;
    cancelBg.x = -80;
    cancelBg.y = 140;
    cancelText.x = 35;
    cancelText.y = 150;
	
    textHolder.addChild(textBg,numberText,operatorText);
    cancelHolder.addChild(cancelBg,cancelText);
    btnHolder.addChild(textHolder,cancelHolder);
	
    for(var i=1;i<=16;i++)
    {
        var calcButton = [];
        btn["_"+i] = new createjs.Container();
        shape["_"+i] =  new createjs.Shape();
        shape["_"+i].graphics.beginFill("#312431").drawRoundRect(0, 0, 50, 50, 10);
        txtButton["_"+i] = new createjs.Text();
        txtButton["_"+i].font = "bold 24px Cambria";
        txtButton["_"+i].color = "#FFFFFF";
        txtButton["_"+i].name = "label";
        txtButton["_"+i].textAlign = "center"; 
        txtButton["_"+i].x = 25;//(calcButton.width - txtButton["_"+i].width)/2;
        txtButton["_"+i].y = 10;//calcButton.height/2;
        calcButton = btn["_"+i];
        if(i<13)
        {
            calcButton.x = currentX;
            calcButton.y = currentY;
            currentX +=  nextX; 

            if(i%3 == 0)
            {
                currentY +=  nextY;
                currentX = 0;          
            }

            if(i==10)
            {
                txtButton["_"+i].text = ".";
                //currentX +=  nextX; 
            }
            else if(i==11)
            {
                txtButton["_"+i].text = "0";
            }
            else if(i==12)
            {
                txtButton["_"+i].text = "=";
            }
            else
            {
                txtButton["_"+i].text = i;
            }
        }
        else
        {
            if(i==13)
            {
                currentX = 0;
                currentY = 40;  
                nextX = 60*3; 
                nextY = 60;   
                currentX += nextX;           
            }

            calcButton.x = currentX;
            calcButton.y = currentY; 
            currentY += nextY;

            if(i==13)
            {
                txtButton["_"+i].text = "/";
                //currentX +=  nextX; 
            }
            else if(i==14)
            {
                txtButton["_"+i].text = "*";
            }
            else if(i==15)
            {
                txtButton["_"+i].text = "-";
            }
            else if(i==16)
            {
                txtButton["_"+i].text = "+";
            }
        }
        
        
        calcButton.addChild(shape["_"+i],txtButton["_"+i]);
		calcButton.id = "btn_"+i
        calcButton.addEventListener("click",onCalcButton)
        function onCalcButton(event){
			if(count < 15)
			{
				onCalcButtonClick(event.target.parent.id);
			}			
        }
        btnHolder.addChild(calcButton);        
    }    
 }
 
btnHolder.x = (canvas.width-btnHolder.getBounds().width)/2;
btnHolder.y = (canvas.height-btnHolder.getBounds().height)/2;
stage.addChild(btnHolder);

function onCalcButtonClick(str)
{
	var number = [];
	number = str.split("_");	
    console.log(number) ; 
	switch(number[1])
	{
		case "1":
		case "2":
		case "3":
		case "4":
		case "5":
		case "6":
		case "7":
		case "8":
		case "9":
		case "10":
        case "11":
			if(number[1] == "10")
			{
                console.log(Boolean(dotUsed));
                number[1] = ".";
                if(!Boolean(dotUsed))
                {                    
                    dotUsed = 1;                   
                }
                else
                {
                     return;
                }
			}
            else if(number[1] == "11")
            {
                number[1] = 0;
            }
            else
            {

            }

			if(numberText.text!="0" || number[1] == ".")
			{
                if(!Boolean(operatorSelected))
                {
                    numberText.text = numberText.text + number[1];
                }
                else
                {
                    if(number[1] == ".")
                        number[1] = "0.";
                    numberText.text = number[1];
                    operatorSelected = 0;
                    count = 0;
                }
                
			}
			else
            {
				numberText.text = number[1];
			}			
			break;
		case "12":
            if(number2 == 0)
            {
                number2 = numberText.text;
            }
			onCalculation(number1,number2);
            operatorSelected = 1;
			break;
        case "13":
            operatorText.text = "/";
            operatorSelected = 1;
            console.log(number1,number2)
            if(number1 == 0)
            {                
                number1 = numberText.text;
                console.log("if==> "+number1 +"::"+number2);
            }
            else if(number2 == 0)
            {
                console.log("if==> "+number1+number2);
                number2 = numberText.text;
            }
            else
            {
                onCalculation(number1,number2);
                number1 = numberText.text;
                number2 = 0;
                operatorSelected = 1;
            }
            
            break;
        case "14":
            operatorText.text = "*";
            operatorSelected = 1;
            if(number1 == "0")
            {
                number1 = numberText.text;
            }
            else if(number2 == "0")
            {
                number2 = numberText.text;
            }
            else
            {
                onCalculation(number1,number2);
                number1 = numberText.text;
                number2 = 0;
                operatorSelected = 1;
            }
            break;
        case "15":
            operatorText.text = "-";
            operatorSelected = 1;
            if(number1 == "0")
            {
                number1 = numberText.text;
            }
            else if(number2 == "0")
            {
                number2 = numberText.text;
            }
            else
            {
                onCalculation(number1,number2);
                number1 = numberText.text;
                number2 = 0;
                operatorSelected = 1;
            }
            break;
        case "16":
            operatorText.text = "+";
            operatorSelected = 1;
            if(number1 == "0")
            {
                number1 = numberText.text;
            }
            else if(number2 == "0")
            {
                number2 = numberText.text;
            }
            else
            {
                onCalculation(number1,number2);
                number1 = numberText.text;
                number2 = 0;
                operatorSelected = 1;
            }
            break;
	}
    count = count + 1;
}

cancelHolder.addEventListener("click",onCancelClick);
function onCancelClick(event){
    numberText.text = "0";
    dotUsed = 0;
    count = 0;
    operatorText.text = " ";
    operatorSelected = 0;
    number1 = 0;
    number2 = 0;
}

function onCalculation(value1,value2)
{
    if(operatorText != " ")
    {
        if(value1!=0 && value2!=0)
        {
             switch(operatorText.text)
            {
                case "/":
                    numberText.text = value1/value2;
                    operatorText.text = "";
                    break;
                case "*":
                    numberText.text = value1*value2;
                    operatorText.text = "";
                    break;
                case "-":
                    numberText.text = value1-value2;
                    operatorText.text = "";
                    break;
                case "+":
                    numberText.text = Number(value1)+Number(value2);
                    operatorText.text = "";
                    break;
            } 
        }
        number1 = 0;
        number2 = 0; 
        console.log(numberText.text)   
    }
}

createjs.Ticker.framerate = 30;
createjs.Ticker.addEventListener("tick", handleTick);
 function handleTick(event) {
     stage.update();
 }

 
// BUDGET CONTROLLER
var budgetController = (function(){
    // Data struecture
    var Expense = function(id, description, value){
        this.id = id;
        this.description = description;
        this.value = value;
        this.percentage = -1;
    };

    Expense.prototype.calPercentages = function(totalIncome){

        if (totalIncome > 0){
            this.percentage = Math.round((this.value/totalIncome) * 100);
        }else{
            this.percentage = -1;
        };

    };
    Expense.prototype.getPercentages = function(){
        return this.percentage;
    };

    var Income = function(id, description, value){
        this.id = id;
        this.description = description;
        this.value = value;
    };

    // Create Database
    var data = {
        allItems:{
            exp: [],
            inc: []
        },
        totals:{
            exp: 0,
            inc: 0
        },
        budget:0,
        percentage:-1,

    };

    var calculateTotal = function(type){
        var sum = 0;

        data.allItems[type].forEach(function(cur){
            sum += cur.value
        });
        data.totals[type] = sum;
    };

    return {
        addItem:function(type, des, val){
            var newItem, ID;

            // Create new ID
            if (data.allItems[type].length > 0){
                ID = data.allItems[type][data.allItems[type].length -1].id+1;
            }else{
                ID = 0;
            }

            // Create new item based on 'inc' or 'exp'
            if (type === 'exp'){
                newItem = new Expense(ID, des, val);

            }else if (type === 'inc'){
                newItem = new Income(ID, des, val);
            }

            // Push it into our data struecture
            data.allItems[type].push(newItem);
            return newItem;

        },
        calculateBudget: function(){
            
            
            // Calculate each other category
            calculateTotal('inc');
            calculateTotal('exp');

            // Calcuate Budget.
            data.budget = data.totals['inc'] - data.totals['exp'];

            // Calcuate Percentage.
     
            if (data.totals['inc'] > 0){
                data.percentage = Math.round((data.totals['exp']/data.totals['inc']) * 100);
            }else{
                data.percentage = -1;
            }

        },

        calculatePercentages: function(){
            data.allItems.exp.forEach(function(cur){
                cur.calPercentages(data.totals.inc);
            });
        },

        getPercentages: function(){
            var listPercentages = data.allItems.exp.map(function(cur){
                return cur.getPercentages();
            });
            return listPercentages;
        },

        getBudgetDate:function(){
            return {
                budget:data.budget,
                percent:data.percentage,
                totalIncome: data.totals.inc,
                totalExpense: data.totals.exp
            }
        },

        displayData:function(){
            return data;
        },

        deleteBudgetByID: function(type, ID){
            //FIXME: Maybe can get current element?
            data.allItems[type].forEach(function(current){
                if(current.id == ID){
                    var selectIndex;
                    selectIndex = data.allItems[type].indexOf(current);
                    if (selectIndex !== -1){
                        console.log(data.allItems[type].indexOf(current));
                        data.allItems[type].splice(data.allItems[type].indexOf(current), 1);
                    }
                }
            });
        }
    }
})();



// UI CONTROLLER
var UIController = (function(){
    // Select DOM strings
    var DOMstrings = {
        inputType:'.add__type',
        inputDescription:'.add__description',
        inputValue:'.add__value',
        inputBtn: '.add__btn',
        expensesItem: '.expenses__list',
        incomeItem: '.income__list',
        budgetLabel:'.budget__value',
        budgetIncomeValue: '.budget__income--value',
        budgetExpenseValue:'.budget__expenses--value',
        budgetPercentageValue:'.budget__expenses--percentage',
        container:'.container'
    }


    return {
        getInput:function(){
            return {
                type:document.querySelector(DOMstrings.inputType).value,
                descript:document.querySelector(DOMstrings.inputDescription).value,
                value:parseFloat(document.querySelector(DOMstrings.inputValue).value)
            };
        },
        addListItem: function(obj, type){
            var html, newHtml, element;
            // Create HTML string with placeholder text
            if (type === 'inc'){
                element = DOMstrings.incomeItem;
                html = '<div class="item clearfix" id="inc-%id%"><div class="item__description">%descript%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
            }else if (type === 'exp'){
                element = DOMstrings.expensesItem;
                html = '<div class="item clearfix" id="exp-%id%"><div class="item__description">%descript%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
            }
            
            // Replace the palceholder text with some actual data

            newHtml = html.replace('%id%', obj.id);
            newHtml = newHtml.replace('%descript%', obj.description);
            newHtml = newHtml.replace('%value%', obj.value);

            // Insert the HTML into the DOM

            document.querySelector(element).insertAdjacentHTML('beforeend', newHtml);

        },
        deleteListItem: function(selectID){
            var ele = document.getElementById(selectID);
            ele.parentNode.removeChild(ele);
         
        },
        clearFields: function(){
            var fields, fieldsArr;

            fields = document.querySelectorAll(DOMstrings.inputDescription+', '+DOMstrings.inputValue);
            fieldsArr = Array.prototype.slice.call(fields);

            fieldsArr.forEach(function(element, index, array){
                element.value = "";
            });

            fieldsArr[0].focus()

        },
        displayBudget: function(obj){

            document.querySelector(DOMstrings.budgetLabel).textContent = obj.budget;
            document.querySelector(DOMstrings.budgetIncomeValue).textContent = obj.totalIncome;
            document.querySelector(DOMstrings.budgetExpenseValue).textContent = obj.totalExpense;
            if (obj.percent > 0){
                document.querySelector(DOMstrings.budgetPercentageValue).textContent = obj.percent+' %';
            }else{
                document.querySelector(DOMstrings.budgetPercentageValue).textContent = '---';
            }

        },
        getDOMstrings: function(){
            return DOMstrings;
        }
    };
})();


//　CONTROLLER
var controller = (function(budgetCtrl, UICtrl){
    // Set up event listener
    var setUpEventListener = function(){
        var DOM = UICtrl.getDOMstrings();
        // Add ENTER button event.
        document.querySelector(DOM.inputBtn).addEventListener('click', ctrlAddItem);

        // Add delete item event.
        document.querySelector(DOM.container).addEventListener('click', ctrlDeleteItem);

        // Add the return keyboard event.
        document.addEventListener('keypress', function(event){
            if (event.keyCode === 13 || event.which === 13){
                ctrlAddItem();
            }
        });

    };
    // Update Percentages Function.
    var updatePercentages = function(){
        // 1. Calcuate percentages by each one.
        budgetCtrl.calculatePercentages();

        // 2. Get Percentages by each one.
        var percentages = budgetCtrl.getPercentages();

        // 3. Update UI with percentages.
        console.log(percentages);
    };

    // Update Budget Function
    var updateBudget = function(){
        // 1. Calculate the budget.

        budgetCtrl.calculateBudget();

        // 2. Get the budget.

        var budget = budgetCtrl.getBudgetDate();

        // 3. Display the budget on the UI.

        UICtrl.displayBudget(budget);
 
    };

    // Delete Item Function.
    var ctrlDeleteItem = function(event){
        var itemID, type, ID;

        itemID = event.target.parentNode.parentNode.parentNode.parentNode.id;

        if (itemID){
            // 1. retrieve ID.
            splitID = itemID.split('-');
            type = splitID[0];
            ID = splitID[1];

            // 2. Delete item from budget controller and UI controller.
            budgetCtrl.deleteBudgetByID(type, ID);
            UICtrl.deleteListItem(itemID);


            // 3. Update Budget Function.
            updateBudget()

        }
    
    };

    // Add Item Function.
    var ctrlAddItem = function(){
        var inputData, newItem;

         // 1. Get the field input data.

        inputData = UICtrl.getInput();

        if (inputData.descript !== "" && !isNaN(inputData.value) && inputData.value > 0){
            // 2. Add the item to the budget controller.
            newItem = budgetCtrl.addItem(inputData.type, inputData.descript, inputData.value);


            // 3. Add the item to the UI.
            UICtrl.addListItem(newItem, inputData.type);

            // 4. Clean input fileds.
            UICtrl.clearFields()

            // 5. Update Budget calculation.
            updateBudget();

            // 6. Update Percentages.
            updatePercentages();
        }


    };

    return {
        init:function(){
            console.log('Application has started.');
            UICtrl.displayBudget({
                budget:0,
                percent:-1,
                totalIncome: 0,
                totalExpense: 0
            });
            setUpEventListener();
        }
    };



})(budgetController, UIController);


controller.init();

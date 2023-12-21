function mediaFunction(x) {
    const text = x.matches ? ["Len", "Leftover", "Len"] : ["Length", "Remaining", "Length"];

    for (let i = 0; i < 3; i++) {
        document.querySelector(`thead tr th:nth-child(${i + 2})`).textContent = text[i];
    }
}

// Create a MediaQueryList object
var x = window.matchMedia("(max-width: 400px)")

// On screen change
x.addEventListener("change", function () {
    mediaFunction(x);
});

function findCombination(target, amounts) {
    function parseAmount(amount) {
        return parseFloat(amount);
    }

    function generateCombinations(index, currentCombination, currentSum) {
        if (currentSum === target) {
            const combinationKey = currentCombination.join(',');
            if (!combinationSet.has(combinationKey)) {
                combinationSet.add(combinationKey);
                combinations.push([...currentCombination]);
            }
            return;
        }

        for (let i = index; i < amounts.length; i++) {
            currentCombination.push(i); // Store the index number
            generateCombinations(i + 1, currentCombination, (currentSum + parseAmount(amounts[i])).toFixed(15) * 1);
            currentCombination.pop();
        }
    }

    const combinations = [];
    const combinationSet = new Set();
    generateCombinations(0, [], 0);
    return combinations;
}

const textarea = document.getElementById("amounts");

function formatCombination(combination) {
    const combinationLength = combination.length;
    const amountsInput = textarea.value;
    const amounts = amountsInput.split('\n').map(amount => amount.trim());
    let result = combination.map(index => amounts[index]);

    let uniqueArray = [...new Set(result)];
    let sortedUniqueArray = uniqueArray.map(item => parseInt(item)).sort((a, b) => a - b);

    // Check for repeats
    if (currentLineText.some(subArr => JSON.stringify(subArr) == JSON.stringify(sortedUniqueArray))) {
        console.log(result.toString());
    } else {
        currentLineText.push(sortedUniqueArray);
        combinationFound++;
        let remainingIndices = amounts.map((_, index) => index).filter(index => !combination.includes(index));
        let remainingBlankFilter = remainingIndices.map(index => amounts[index]);
        let remainingValues = remainingBlankFilter.filter(item => item.trim() !== "");

        return `<tr><td>[${result.join(', ')}]</td><td>${combinationLength}</td><td>[${remainingValues.join(', ')}]</td><td>${remainingValues.length}</td></tr>`;
    }
}

const resultContainer = document.getElementById("result-container");
const sum = document.getElementById("targetSum");

function onFindCombination() {
    validateInput();
    const targetSum = parseFloat(sum.value);
    const amountsInput = textarea.value
    if (!isNaN(targetSum) && /\d/.test(amountsInput)) {
        currentLineText = [[]];
        combinationFound = 0;
        console.log("Remaining:");
        const amounts = amountsInput.split('\n').map(amount => amount.trim());
        const result = findCombination(targetSum, amounts);

        let sum = 0;

        for (let i = 0; i < amounts.length; i++) {
            if (/\d/.test(amounts[i])) {
                sum += parseFloat(amounts[i]);
            }
        }

        resultContainer.innerHTML = `<strong></strong><br><table><thead><tr><th>Combination</th><th>Length</th><th>Remaining</th><th>Length</th></tr></thead><tbody>${result.map(formatCombination).join("")}</tbody></table>`;
        resultContainer.getElementsByTagName("strong")[0].innerHTML = `Combinations Found: ${combinationFound}<span> & </span><br>Total Amount: ${sum.toFixed(15) * 1}`
        mediaFunction(x);
    }
}
function validateInput() {
    let inputValue = textarea.value;

    // Replace any characters that are not numbers, period, or hyphen
    const sanitizedInput = inputValue.replace(/[^0-9.\-\n]/g, '').replace(/--+/g, '-').replace(/\.\.+/g, '.').replaceAll('.-', '.').replace(/([0-9])-/g, '$1').replace(/\.\n/g, '.').replace(/-\n/g, '-').replace(/\n\n/g, '\n')

    const sanitized = (sum.value).replace(/[^0-9.-]/g, '').replace(/--+/g, '-').replace(/\.\.+/g, '.').replaceAll('.-', '.').replace(/([0-9])-/g, '$1');

    // Update the value
    textarea.value = sanitizedInput;
    sum.value = sanitized;
}

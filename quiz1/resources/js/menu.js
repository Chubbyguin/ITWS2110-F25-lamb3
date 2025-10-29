document.addEventListener('DOMContentLoaded', function() {
    loadMenuData();
});


function loadMenuData() {
    const xhr = new XMLHttpRequest();
    
    xhr.open('GET', 'data/menu.json', true);
    
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                handleSuccess(xhr.responseText);
            } else {
                handleError('Failed to load menu data. Status: ' + xhr.status);
            }
        }
    };
    
    xhr.onerror = function() {
        handleError('Network error occurred while loading menu data.');
    };
    
    xhr.send();
}


function handleSuccess(responseText) {
    try {
        const data = JSON.parse(responseText);
        
        document.getElementById('loading').style.display = 'none';
        
        document.getElementById('menu-table').style.display = 'table';
        
        populateMenuTable(data.dishes);
        
    } catch (error) {
        handleError('Error parsing menu data: ' + error.message);
    }
}


function handleError(message) {
    document.getElementById('loading').style.display = 'none';
    const errorDiv = document.getElementById('error');
    errorDiv.style.display = 'block';
    errorDiv.textContent = message;
}


function populateMenuTable(dishes) {
    const tbody = document.getElementById('menu-body');
    
    tbody.innerHTML = '';
    
    dishes.forEach(function(dish) {
        const row = createDishRow(dish);
        tbody.appendChild(row);
    });
}


function createDishRow(dish) {
    const row = document.createElement('tr');
    
    row.appendChild(createImageCell(dish.image, dish.name));
    
    row.appendChild(createDishNameCell(dish.name));
    
    row.appendChild(createDescriptionCell(dish.description));
    
    row.appendChild(createCuisineCell(dish.cuisine));
    
    row.appendChild(createCategoryCell(dish.category));
    
    row.appendChild(createIngredientsCell(dish.ingredients));
    
    row.appendChild(createPriceCell(dish.price));
    
    return row;
}

function createImageCell(imageUrl, altText) {
    const cell = document.createElement('td');
    cell.setAttribute('data-label', 'Image');
    
    const img = document.createElement('img');
    img.src = imageUrl;
    img.alt = altText;
    img.className = 'dish-image';
    
    img.onerror = function() {
        this.src = 'resources/img/placeholder.jpg';
        this.alt = 'Image not available';
    };
    
    cell.appendChild(img);
    return cell;
}


function createDishNameCell(name) {
    const cell = document.createElement('td');
    cell.setAttribute('data-label', 'Dish');
    
    const nameDiv = document.createElement('div');
    nameDiv.className = 'dish-name';
    nameDiv.textContent = name;
    
    cell.appendChild(nameDiv);
    
    return cell;
}


function createDescriptionCell(description) {
    const cell = document.createElement('td');
    cell.setAttribute('data-label', 'Description');
    
    const descDiv = document.createElement('div');
    descDiv.className = 'dish-description';
    descDiv.textContent = description;
    
    cell.appendChild(descDiv);
    
    return cell;
}

function createCuisineCell(cuisine) {
    const cell = document.createElement('td');
    cell.setAttribute('data-label', 'Cuisine');
    
    const badge = document.createElement('span');
    badge.className = 'cuisine-badge';
    badge.textContent = cuisine;
    
    cell.appendChild(badge);
    return cell;
}


function createCategoryCell(category) {
    const cell = document.createElement('td');
    cell.setAttribute('data-label', 'Category');
    
    const badge = document.createElement('span');
    badge.className = 'category-badge category-' + category;
    badge.textContent = category.charAt(0).toUpperCase() + category.slice(1);
    
    cell.appendChild(badge);
    return cell;
}


function createIngredientsCell(ingredients) {
    const cell = document.createElement('td');
    cell.setAttribute('data-label', 'Ingredients');
    
    const list = document.createElement('ul');
    list.className = 'ingredients-list';
    
    ingredients.forEach(function(ingredient) {
        const listItem = document.createElement('li');
        listItem.textContent = ingredient;
        list.appendChild(listItem);
    });
    
    cell.appendChild(list);
    return cell;
}


function createPriceCell(price) {
    const cell = document.createElement('td');
    cell.setAttribute('data-label', 'Price');
    
    const priceDiv = document.createElement('div');
    priceDiv.className = 'price';
    priceDiv.textContent = price;
    
    cell.appendChild(priceDiv);
    return cell;
}
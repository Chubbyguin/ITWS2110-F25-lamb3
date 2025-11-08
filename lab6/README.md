QUESTION 1: Explanation of Classes, Methods, and Execution Flow
 
CLASSES:
Operation: Base class that defines the structure for all operations. Contains protected properties $operand_1 and $operand_2, constructor for validation,
and abstract methods operate() and getEquation() that subclasses must implement.
 
Addition, Subtraction, Multiplication, Division: Concrete subclasses that inherit from Operation. Each implements operate() to perform the actual calculation and getEquation() to return a formatted string of the equation and result.

EXECUTION FLOW AFTER BUTTON CLICK:
1. User enters two numbers and clicks an operation button (e.g., "Add")
2. Form submits via POST to lab6.php
3. PHP checks if REQUEST_METHOD is POST
4. Extracts $o1 and $o2 from $_POST array
5. Checks which button was pressed using isset() on the button name
6. Instantiates the appropriate Operation subclass (e.g., new Addition($o1, $o2))
7. Constructor validates that operands are numeric
8. In the HTML section, getEquation() is called on the $op object
9. getEquation() internally calls operate() to compute the result
10. The formatted equation string is displayed in the <pre> tag
  
METHOD INVOCATION ORDER:
Constructor -> operate() (called by getEquation()) -> getEquation() -> display result
  
  
QUESTION 2: Using $_GET Instead of $_POST
  
If we used $_GET instead of $_POST:
  - The form data would appear in the URL as query parameters
  - Functionality would be identical since we're just reading values
  - Users could bookmark specific calculations
  - The URL could be shared with others
  
Why $_POST is better here:
  - POST is semantically correct for operations that "do something" like the calculations
  - GET should be used for retrieving/viewing data, not performing operations
  - POST doesn't expose data in URL (cleaner, more private)
  - POST requests aren't cached by browsers
  - Following REST principles: GET = read, POST = action/process
  
  
QUESTION 3: Better Way to Determine Which Button Was Pressed
  
Yes, There are better approaches:
  
OPTION 1: Use a single submit button with a dropdown/radio buttons for operation
 - Only one submit button named "submit"
 - A select/radio input named "operation" with values: add, subtract, multiply, divide
 - Check $_POST['operation'] value instead of multiple isset() checks
 - Cleaner code with a switch statement or array mapping
 
OPTION 2: Use the button value attribute more intelligently
 - All buttons have the same name (e.g., name="operation")
 - Different values: value="add", value="subtract", etc.
 - Single check: $_POST['operation'] gives you the operation type directly
  
OPTION 3: Use a map
 - Create an associative array mapping button names to class names
 - Loop through or use array_key_exists() to find which button was pressed
 - Example:
    $operations = ['add' => 'Addition', 'sub' => 'Subtraction', ...];
    foreach ($operations as $key => $class) {
      if (isset($_POST[$key])) {
        $op = new $class($o1, $o2);
        break;
      }
    }
This approach reduces repetitive if statements and makes it easier to add new operations.
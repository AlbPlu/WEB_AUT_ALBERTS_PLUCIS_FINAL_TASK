const PracticeFormPage = {
  url: 'https://demoqa.com/automation-practice-form',
  firstNameInput: '#firstName',
  lastNameInput: '#lastName',
  userEmailInput: '#userEmail',
  userMobileInput: '#userNumber',
  dateOfBirthInput: '#dateOfBirthInput',
  subjectsInput: '#subjectsInput',
  uploadPictureBtn: '#uploadPicture',
  currentAddressTextarea: '#currentAddress',
  stateDropdown: '#state',
  cityDropdown: '#city',      
  submitBtn: '#submit',
};

const ConfirmationModal = {
  modalHeader: '.modal-header',
  modalBody: '.modal-body',
  closeBtn: '#closeLargeModal'
};

function selectGender(gender) {
  cy.contains('label', gender).click();
}

function setDateOfBirth(monthIndex, day, year) { 
  cy.get(PracticeFormPage.dateOfBirthInput).click();
  cy.get('.react-datepicker__year-select').select(year.toString());
  cy.get('.react-datepicker__month-select').select(monthIndex.toString());
  cy.get('.react-datepicker__month').contains(day).click();
}

function addSubject(subject) {
  cy.get(PracticeFormPage.subjectsInput).type(subject);
  cy.get('.subjects-auto-complete__menu').contains('div', subject).click({ force: true });
}

function selectHobby(hobby) {
  cy.contains('label', hobby).click();
}

function selectStateAndCity(state, city) {
  cy.get(PracticeFormPage.stateDropdown).click();
  cy.contains('div', state).click({ force: true });
  cy.get(PracticeFormPage.cityDropdown).click();
  cy.contains('div', city).click({ force: true });
}


describe('Student Registration Form Automation', () => {

  beforeEach(() => {
    cy.visit(PracticeFormPage.url);
  });

  it('should fill out the form, upload an image, and validate submission', () => {
    const userData = {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      gender: 'Male',
      mobile: '1234567890',
      dateOfBirth: '28 February,1930',
      subjects: 'Economics',
      hobbies: 'Music',
      picture: 'sad.png',
      currentAddress: '123 Test Street, Automation City, Block 1',
      stateAndCity: 'NCR Delhi'
    };

    cy.get(PracticeFormPage.firstNameInput).type(userData.firstName);
    cy.get(PracticeFormPage.lastNameInput).type(userData.lastName);
    cy.get(PracticeFormPage.userEmailInput).type(userData.email);

    selectGender(userData.gender);

    cy.get(PracticeFormPage.userMobileInput).type(userData.mobile);

    setDateOfBirth(2, '28', 1930);
    addSubject(userData.subjects);
    selectHobby(userData.hobbies);

    cy.get(PracticeFormPage.uploadPictureBtn).selectFile(`files/${userData.picture}`);
    cy.get(PracticeFormPage.currentAddressTextarea).type(userData.currentAddress);

    selectStateAndCity('NCR', 'Delhi');

    cy.get(PracticeFormPage.submitBtn).click();
    cy.get(ConfirmationModal.modalBody).should('be.visible');

    cy.contains('.table-responsive tr', 'Student Name').find('td').eq(1).should('have.text', `${userData.firstName} ${userData.lastName}`);
    cy.contains('.table-responsive tr', 'Student Email').find('td').eq(1).should('have.text', userData.email);
    cy.contains('.table-responsive tr', 'Gender').find('td').eq(1).should('have.text', userData.gender);
    cy.contains('.table-responsive tr', 'Mobile').find('td').eq(1).should('have.text', userData.mobile);
    cy.contains('.table-responsive tr', 'Date of Birth').find('td').eq(1).should('have.text', userData.dateOfBirth);
    cy.contains('.table-responsive tr', 'Subjects').find('td').eq(1).should('have.text', userData.subjects);
    cy.contains('.table-responsive tr', 'Hobbies').find('td').eq(1).should('have.text', userData.hobbies);
    cy.contains('.table-responsive tr', 'Picture').find('td').eq(1).should('have.text', userData.picture);
    cy.contains('.table-responsive tr', 'Address').find('td').eq(1).should('have.text', userData.currentAddress);
    cy.contains('.table-responsive tr', 'State and City').find('td').eq(1).should('have.text', userData.stateAndCity);

    cy.get(ConfirmationModal.closeBtn).click({ force: true });
  });
});
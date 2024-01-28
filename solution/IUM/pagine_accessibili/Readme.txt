
------------------------------------ PAGINE ACCESSIBILI ------------------------------------
Le pagine accessibili sono due:
- Sign in
- Sign up
In realtà sul progetto di react è una pagina sola, e al cliccare di sign-up (nella pagina di sign-in) 
oppure su sign-in (nella pagina di sign-up),
il form si anima traslando a destra (o sinistra) mostrando sign-in (o sign-up se si era nel sign-in).
Siccome duplicare lo stesso funzionamento su HTML e Javascript normale avrebbe allungato eccessivamente le tempistiche, lo switch tra
sign-in e sign-up che avviene tramite il click, cambierà semplicemente l'HTML visualizzato passando da una pagina all'altra tramite l'uso di href.
Ho comunque duplicato la logica di validazione e di animazione della label su uno script.js per rendere le pagine comunque simili a quelle del progetto di TWEB.

------------------------------------ VALIDATORS CSS/HTML ------------------------------------

Per quanto riguarda i validatori online, ho messo gli screenshot dei test passati nella cartella ./validationstests (non ho trovato modi più furbi di
salvare quelle pagine senza perdere il css), ovviamente si è liberi di ri-testare quando/quante volte si vuole sia gli html, sia i css.


Ci saranno dei warnings nelle validazioni css, ma sono solo dovuti all'uso del framework NextUI (che lavora utilizzando Tailwind  "under the hood").


Ringrazio per la lettura.


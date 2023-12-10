/**
 * SwaggerUI docs schema for this mongoose schema:
 * {
 *   first_name: { type: String },
 *   last_name: { type: String },
 *   last_season: { type: String, required: true },
 *   player_code: { type: String, required: true },
 *   country_of_birth: { type: String },
 *   city_of_birth: { type: String },
 *   country_of_citizenship: { type: String },
 *   date_of_birth: { type: String },
 *   sub_position: { type: String },
 *   position: { type: String, required: true },
 *   foot: { type: String },
 *   height_in_cm: { type: String },
 *   market_value_in_eur: { type: String },
 *   highest_market_value_in_eur: { type: String },
 *   contract_expiration_date: { type: String },
 *   agent_name: { type: String },
 *   image_url: { type: String, required: true },
 *   url: { type: String, required: true },
 *   current_club: { type: mongoose.Schema.Types.ObjectId, ref: 'Club' },
 * }
 */

const playerSwaggerSchema = {
    type: 'object',
    properties: {
        first_name: {
            type: 'string',
            description: 'First name of the player',
            example: 'Lionel',
        },
        last_name: {
            type: 'string',
            description: 'Last name of the player',
            example: 'Messi',
        },
        last_season: {
            type: 'string',
            description: 'Last season of the player',
            example: '2019/2020',
        },
        player_code: {
            type: 'string',
            description: 'Player code of the player',
            example: '13136',
        },
        country_of_birth: {
            type: 'string',
            description: 'Country of birth of the player',
            example: 'Argentina',
        },
        city_of_birth: {
            type: 'string',
            description: 'City of birth of the player',
            example: 'Rosario',
        },
        country_of_citizenship: {
            type: 'string',
            description: 'Country of citizenship of the player',
            example: 'Argentina',
        },
        date_of_birth: {
            type: 'string',
            description: 'Date of birth of the player',
            example: '1987-06-24',
        },
        sub_position: {
            type: 'string',
            description: 'Sub position of the player',
            example: 'Centre-Forward',
        },
        position: {
            type: 'string',
            description: 'Position of the player',
            example: 'Forward',
        },
        foot: {
            type: 'string',
            description: 'Foot of the player',
            example: 'left',
        },
        height_in_cm: {
            type: 'string',
            description: 'Height in cm of the player',
            example: '170',
        },
        market_value_in_eur: {
            type: 'string',
            description: 'Market value in eur of the player',
            example: '100000000',
        },
        highest_market_value_in_eur: {
            type: 'string',
            description: 'Highest market value in eur of the player',
            example: '100000000',
        },
        contract_expiration_date: {
            type: 'string',
            description: 'Contract expiration date of the player',
            example: '2021-06-30',
        },
        agent_name: {
            type: 'string',
            description: 'Agent name of the player',
            example: 'Doyen Sports',

        },

        image_url: {
            type: 'string',
            description: 'Image url of the player',
            example: 'https://tmssl.akamaized.net/images/portrait/header/28003-1568392677.jpg?lm=1568392693',
        },

        url: {
            type: 'string',
            description: 'Url of the player',
            example: 'https://www.transfermarkt.com/lionel-messi/profil/spieler/28003',
        },

        current_club: {
            type: 'string',
            description: 'Current club of the player',
            example: '5f9d1b4b2f6f1f0e5c1d7a0a',
        },
    }
}

module.exports = {playerSwaggerSchema};
class SelectTimezone {
    constructor($scope) {
        'ngInject';

        this.timezones = [
            {
                "name": "Pacific/Midway",
                "pretty_name": "Pacific/Midway (UTC-11:00)"
            },
            {
                "name": "Pacific/Niue",
                "pretty_name": "Pacific/Niue (UTC-11:00)"
            },
            {
                "name": "Pacific/Pago_Pago",
                "pretty_name": "Pacific/Pago_Pago (UTC-11:00)"
            },
            {
                "name": "Pacific/Honolulu",
                "pretty_name": "Pacific/Honolulu (UTC-10:00)"
            },
            {
                "name": "Pacific/Johnston",
                "pretty_name": "Pacific/Johnston (UTC-10:00)"
            },
            {
                "name": "Pacific/Rarotonga",
                "pretty_name": "Pacific/Rarotonga (UTC-10:00)"
            },
            {
                "name": "Pacific/Tahiti",
                "pretty_name": "Pacific/Tahiti (UTC-10:00)"
            },
            {
                "name": "Pacific/Marquesas",
                "pretty_name": "Pacific/Marquesas (UTC-09:30)"
            },
            {
                "name": "America/Adak",
                "pretty_name": "America/Adak (UTC-09:00)"
            },
            {
                "name": "Pacific/Gambier",
                "pretty_name": "Pacific/Gambier (UTC-09:00)"
            },
            {
                "name": "America/Anchorage",
                "pretty_name": "America/Anchorage (UTC-08:00)"
            },
            {
                "name": "America/Juneau",
                "pretty_name": "America/Juneau (UTC-08:00)"
            },
            {
                "name": "America/Metlakatla",
                "pretty_name": "America/Metlakatla (UTC-08:00)"
            },
            {
                "name": "America/Nome",
                "pretty_name": "America/Nome (UTC-08:00)"
            },
            {
                "name": "America/Sitka",
                "pretty_name": "America/Sitka (UTC-08:00)"
            },
            {
                "name": "America/Yakutat",
                "pretty_name": "America/Yakutat (UTC-08:00)"
            },
            {
                "name": "Pacific/Pitcairn",
                "pretty_name": "Pacific/Pitcairn (UTC-08:00)"
            },
            {
                "name": "America/Chihuahua",
                "pretty_name": "America/Chihuahua (UTC-07:00)"
            },
            {
                "name": "America/Creston",
                "pretty_name": "America/Creston (UTC-07:00)"
            },
            {
                "name": "America/Dawson",
                "pretty_name": "America/Dawson (UTC-07:00)"
            },
            {
                "name": "America/Dawson_Creek",
                "pretty_name": "America/Dawson_Creek (UTC-07:00)"
            },
            {
                "name": "America/Fort_Nelson",
                "pretty_name": "America/Fort_Nelson (UTC-07:00)"
            },
            {
                "name": "America/Hermosillo",
                "pretty_name": "America/Hermosillo (UTC-07:00)"
            },
            {
                "name": "America/Los_Angeles",
                "pretty_name": "America/Los_Angeles (UTC-07:00)"
            },
            {
                "name": "America/Mazatlan",
                "pretty_name": "America/Mazatlan (UTC-07:00)"
            },
            {
                "name": "America/Phoenix",
                "pretty_name": "America/Phoenix (UTC-07:00)"
            },
            {
                "name": "America/Tijuana",
                "pretty_name": "America/Tijuana (UTC-07:00)"
            },
            {
                "name": "America/Vancouver",
                "pretty_name": "America/Vancouver (UTC-07:00)"
            },
            {
                "name": "America/Whitehorse",
                "pretty_name": "America/Whitehorse (UTC-07:00)"
            },
            {
                "name": "America/Bahia_Banderas",
                "pretty_name": "America/Bahia_Banderas (UTC-06:00)"
            },
            {
                "name": "America/Belize",
                "pretty_name": "America/Belize (UTC-06:00)"
            },
            {
                "name": "America/Boise",
                "pretty_name": "America/Boise (UTC-06:00)"
            },
            {
                "name": "America/Cambridge_Bay",
                "pretty_name": "America/Cambridge_Bay (UTC-06:00)"
            },
            {
                "name": "America/Costa_Rica",
                "pretty_name": "America/Costa_Rica (UTC-06:00)"
            },
            {
                "name": "America/Denver",
                "pretty_name": "America/Denver (UTC-06:00)"
            },
            {
                "name": "America/Edmonton",
                "pretty_name": "America/Edmonton (UTC-06:00)"
            },
            {
                "name": "America/El_Salvador",
                "pretty_name": "America/El_Salvador (UTC-06:00)"
            },
            {
                "name": "America/Guatemala",
                "pretty_name": "America/Guatemala (UTC-06:00)"
            },
            {
                "name": "America/Inuvik",
                "pretty_name": "America/Inuvik (UTC-06:00)"
            },
            {
                "name": "America/Managua",
                "pretty_name": "America/Managua (UTC-06:00)"
            },
            {
                "name": "America/Merida",
                "pretty_name": "America/Merida (UTC-06:00)"
            },
            {
                "name": "America/Mexico_City",
                "pretty_name": "America/Mexico_City (UTC-06:00)"
            },
            {
                "name": "America/Monterrey",
                "pretty_name": "America/Monterrey (UTC-06:00)"
            },
            {
                "name": "America/Ojinaga",
                "pretty_name": "America/Ojinaga (UTC-06:00)"
            },
            {
                "name": "America/Regina",
                "pretty_name": "America/Regina (UTC-06:00)"
            },
            {
                "name": "America/Swift_Current",
                "pretty_name": "America/Swift_Current (UTC-06:00)"
            },
            {
                "name": "America/Tegucigalpa",
                "pretty_name": "America/Tegucigalpa (UTC-06:00)"
            },
            {
                "name": "America/Yellowknife",
                "pretty_name": "America/Yellowknife (UTC-06:00)"
            },
            {
                "name": "Pacific/Galapagos",
                "pretty_name": "Pacific/Galapagos (UTC-06:00)"
            },
            {
                "name": "America/Atikokan",
                "pretty_name": "America/Atikokan (UTC-05:00)"
            },
            {
                "name": "America/Bogota",
                "pretty_name": "America/Bogota (UTC-05:00)"
            },
            {
                "name": "America/Cancun",
                "pretty_name": "America/Cancun (UTC-05:00)"
            },
            {
                "name": "America/Cayman",
                "pretty_name": "America/Cayman (UTC-05:00)"
            },
            {
                "name": "America/Chicago",
                "pretty_name": "America/Chicago (UTC-05:00)"
            },
            {
                "name": "America/Eirunepe",
                "pretty_name": "America/Eirunepe (UTC-05:00)"
            },
            {
                "name": "America/Guayaquil",
                "pretty_name": "America/Guayaquil (UTC-05:00)"
            },
            {
                "name": "America/Indiana/Knox",
                "pretty_name": "America/Indiana/Knox (UTC-05:00)"
            },
            {
                "name": "America/Indiana/Tell_City",
                "pretty_name": "America/Indiana/Tell_City (UTC-05:00)"
            },
            {
                "name": "America/Jamaica",
                "pretty_name": "America/Jamaica (UTC-05:00)"
            },
            {
                "name": "America/Lima",
                "pretty_name": "America/Lima (UTC-05:00)"
            },
            {
                "name": "America/Matamoros",
                "pretty_name": "America/Matamoros (UTC-05:00)"
            },
            {
                "name": "America/Menominee",
                "pretty_name": "America/Menominee (UTC-05:00)"
            },
            {
                "name": "America/North_Dakota/Beulah",
                "pretty_name": "America/North_Dakota/Beulah (UTC-05:00)"
            },
            {
                "name": "America/North_Dakota/Center",
                "pretty_name": "America/North_Dakota/Center (UTC-05:00)"
            },
            {
                "name": "America/North_Dakota/New_Salem",
                "pretty_name": "America/North_Dakota/New_Salem (UTC-05:00)"
            },
            {
                "name": "America/Panama",
                "pretty_name": "America/Panama (UTC-05:00)"
            },
            {
                "name": "America/Port-au-Prince",
                "pretty_name": "America/Port-au-Prince (UTC-05:00)"
            },
            {
                "name": "America/Rainy_River",
                "pretty_name": "America/Rainy_River (UTC-05:00)"
            },
            {
                "name": "America/Rankin_Inlet",
                "pretty_name": "America/Rankin_Inlet (UTC-05:00)"
            },
            {
                "name": "America/Resolute",
                "pretty_name": "America/Resolute (UTC-05:00)"
            },
            {
                "name": "America/Rio_Branco",
                "pretty_name": "America/Rio_Branco (UTC-05:00)"
            },
            {
                "name": "America/Winnipeg",
                "pretty_name": "America/Winnipeg (UTC-05:00)"
            },
            {
                "name": "Pacific/Easter",
                "pretty_name": "Pacific/Easter (UTC-05:00)"
            },
            {
                "name": "America/Anguilla",
                "pretty_name": "America/Anguilla (UTC-04:00)"
            },
            {
                "name": "America/Antigua",
                "pretty_name": "America/Antigua (UTC-04:00)"
            },
            {
                "name": "America/Aruba",
                "pretty_name": "America/Aruba (UTC-04:00)"
            },
            {
                "name": "America/Barbados",
                "pretty_name": "America/Barbados (UTC-04:00)"
            },
            {
                "name": "America/Blanc-Sablon",
                "pretty_name": "America/Blanc-Sablon (UTC-04:00)"
            },
            {
                "name": "America/Boa_Vista",
                "pretty_name": "America/Boa_Vista (UTC-04:00)"
            },
            {
                "name": "America/Campo_Grande",
                "pretty_name": "America/Campo_Grande (UTC-04:00)"
            },
            {
                "name": "America/Caracas",
                "pretty_name": "America/Caracas (UTC-04:00)"
            },
            {
                "name": "America/Cuiaba",
                "pretty_name": "America/Cuiaba (UTC-04:00)"
            },
            {
                "name": "America/Curacao",
                "pretty_name": "America/Curacao (UTC-04:00)"
            },
            {
                "name": "America/Detroit",
                "pretty_name": "America/Detroit (UTC-04:00)"
            },
            {
                "name": "America/Dominica",
                "pretty_name": "America/Dominica (UTC-04:00)"
            },
            {
                "name": "America/Grand_Turk",
                "pretty_name": "America/Grand_Turk (UTC-04:00)"
            },
            {
                "name": "America/Grenada",
                "pretty_name": "America/Grenada (UTC-04:00)"
            },
            {
                "name": "America/Guadeloupe",
                "pretty_name": "America/Guadeloupe (UTC-04:00)"
            },
            {
                "name": "America/Guyana",
                "pretty_name": "America/Guyana (UTC-04:00)"
            },
            {
                "name": "America/Havana",
                "pretty_name": "America/Havana (UTC-04:00)"
            },
            {
                "name": "America/Indiana/Indianapolis",
                "pretty_name": "America/Indiana/Indianapolis (UTC-04:00)"
            },
            {
                "name": "America/Indiana/Marengo",
                "pretty_name": "America/Indiana/Marengo (UTC-04:00)"
            },
            {
                "name": "America/Indiana/Petersburg",
                "pretty_name": "America/Indiana/Petersburg (UTC-04:00)"
            },
            {
                "name": "America/Indiana/Vevay",
                "pretty_name": "America/Indiana/Vevay (UTC-04:00)"
            },
            {
                "name": "America/Indiana/Vincennes",
                "pretty_name": "America/Indiana/Vincennes (UTC-04:00)"
            },
            {
                "name": "America/Indiana/Winamac",
                "pretty_name": "America/Indiana/Winamac (UTC-04:00)"
            },
            {
                "name": "America/Iqaluit",
                "pretty_name": "America/Iqaluit (UTC-04:00)"
            },
            {
                "name": "America/Kentucky/Louisville",
                "pretty_name": "America/Kentucky/Louisville (UTC-04:00)"
            },
            {
                "name": "America/Kentucky/Monticello",
                "pretty_name": "America/Kentucky/Monticello (UTC-04:00)"
            },
            {
                "name": "America/Kralendijk",
                "pretty_name": "America/Kralendijk (UTC-04:00)"
            },
            {
                "name": "America/La_Paz",
                "pretty_name": "America/La_Paz (UTC-04:00)"
            },
            {
                "name": "America/Lower_Princes",
                "pretty_name": "America/Lower_Princes (UTC-04:00)"
            },
            {
                "name": "America/Manaus",
                "pretty_name": "America/Manaus (UTC-04:00)"
            },
            {
                "name": "America/Marigot",
                "pretty_name": "America/Marigot (UTC-04:00)"
            },
            {
                "name": "America/Martinique",
                "pretty_name": "America/Martinique (UTC-04:00)"
            },
            {
                "name": "America/Montserrat",
                "pretty_name": "America/Montserrat (UTC-04:00)"
            },
            {
                "name": "America/Nassau",
                "pretty_name": "America/Nassau (UTC-04:00)"
            },
            {
                "name": "America/New_York",
                "pretty_name": "America/New_York (UTC-04:00)"
            },
            {
                "name": "America/Nipigon",
                "pretty_name": "America/Nipigon (UTC-04:00)"
            },
            {
                "name": "America/Pangnirtung",
                "pretty_name": "America/Pangnirtung (UTC-04:00)"
            },
            {
                "name": "America/Port_of_Spain",
                "pretty_name": "America/Port_of_Spain (UTC-04:00)"
            },
            {
                "name": "America/Porto_Velho",
                "pretty_name": "America/Porto_Velho (UTC-04:00)"
            },
            {
                "name": "America/Puerto_Rico",
                "pretty_name": "America/Puerto_Rico (UTC-04:00)"
            },
            {
                "name": "America/Santo_Domingo",
                "pretty_name": "America/Santo_Domingo (UTC-04:00)"
            },
            {
                "name": "America/St_Barthelemy",
                "pretty_name": "America/St_Barthelemy (UTC-04:00)"
            },
            {
                "name": "America/St_Kitts",
                "pretty_name": "America/St_Kitts (UTC-04:00)"
            },
            {
                "name": "America/St_Lucia",
                "pretty_name": "America/St_Lucia (UTC-04:00)"
            },
            {
                "name": "America/St_Thomas",
                "pretty_name": "America/St_Thomas (UTC-04:00)"
            },
            {
                "name": "America/St_Vincent",
                "pretty_name": "America/St_Vincent (UTC-04:00)"
            },
            {
                "name": "America/Thunder_Bay",
                "pretty_name": "America/Thunder_Bay (UTC-04:00)"
            },
            {
                "name": "America/Toronto",
                "pretty_name": "America/Toronto (UTC-04:00)"
            },
            {
                "name": "America/Tortola",
                "pretty_name": "America/Tortola (UTC-04:00)"
            },
            {
                "name": "America/Araguaina",
                "pretty_name": "America/Araguaina (UTC-03:00)"
            },
            {
                "name": "America/Argentina/Buenos_Aires",
                "pretty_name": "America/Argentina/Buenos_Aires (UTC-03:00)"
            },
            {
                "name": "America/Argentina/Catamarca",
                "pretty_name": "America/Argentina/Catamarca (UTC-03:00)"
            },
            {
                "name": "America/Argentina/Cordoba",
                "pretty_name": "America/Argentina/Cordoba (UTC-03:00)"
            },
            {
                "name": "America/Argentina/Jujuy",
                "pretty_name": "America/Argentina/Jujuy (UTC-03:00)"
            },
            {
                "name": "America/Argentina/La_Rioja",
                "pretty_name": "America/Argentina/La_Rioja (UTC-03:00)"
            },
            {
                "name": "America/Argentina/Mendoza",
                "pretty_name": "America/Argentina/Mendoza (UTC-03:00)"
            },
            {
                "name": "America/Argentina/Rio_Gallegos",
                "pretty_name": "America/Argentina/Rio_Gallegos (UTC-03:00)"
            },
            {
                "name": "America/Argentina/Salta",
                "pretty_name": "America/Argentina/Salta (UTC-03:00)"
            },
            {
                "name": "America/Argentina/San_Juan",
                "pretty_name": "America/Argentina/San_Juan (UTC-03:00)"
            },
            {
                "name": "America/Argentina/San_Luis",
                "pretty_name": "America/Argentina/San_Luis (UTC-03:00)"
            },
            {
                "name": "America/Argentina/Tucuman",
                "pretty_name": "America/Argentina/Tucuman (UTC-03:00)"
            },
            {
                "name": "America/Argentina/Ushuaia",
                "pretty_name": "America/Argentina/Ushuaia (UTC-03:00)"
            },
            {
                "name": "America/Asuncion",
                "pretty_name": "America/Asuncion (UTC-03:00)"
            },
            {
                "name": "America/Bahia",
                "pretty_name": "America/Bahia (UTC-03:00)"
            },
            {
                "name": "America/Belem",
                "pretty_name": "America/Belem (UTC-03:00)"
            },
            {
                "name": "America/Cayenne",
                "pretty_name": "America/Cayenne (UTC-03:00)"
            },
            {
                "name": "America/Fortaleza",
                "pretty_name": "America/Fortaleza (UTC-03:00)"
            },
            {
                "name": "America/Glace_Bay",
                "pretty_name": "America/Glace_Bay (UTC-03:00)"
            },
            {
                "name": "America/Godthab",
                "pretty_name": "America/Godthab (UTC-03:00)"
            },
            {
                "name": "America/Goose_Bay",
                "pretty_name": "America/Goose_Bay (UTC-03:00)"
            },
            {
                "name": "America/Halifax",
                "pretty_name": "America/Halifax (UTC-03:00)"
            },
            {
                "name": "America/Maceio",
                "pretty_name": "America/Maceio (UTC-03:00)"
            },
            {
                "name": "America/Moncton",
                "pretty_name": "America/Moncton (UTC-03:00)"
            },
            {
                "name": "America/Montevideo",
                "pretty_name": "America/Montevideo (UTC-03:00)"
            },
            {
                "name": "America/Paramaribo",
                "pretty_name": "America/Paramaribo (UTC-03:00)"
            },
            {
                "name": "America/Recife",
                "pretty_name": "America/Recife (UTC-03:00)"
            },
            {
                "name": "America/Santarem",
                "pretty_name": "America/Santarem (UTC-03:00)"
            },
            {
                "name": "America/Santiago",
                "pretty_name": "America/Santiago (UTC-03:00)"
            },
            {
                "name": "America/Sao_Paulo",
                "pretty_name": "America/Sao_Paulo (UTC-03:00)"
            },
            {
                "name": "America/Thule",
                "pretty_name": "America/Thule (UTC-03:00)"
            },
            {
                "name": "Antarctica/Palmer",
                "pretty_name": "Antarctica/Palmer (UTC-03:00)"
            },
            {
                "name": "Antarctica/Rothera",
                "pretty_name": "Antarctica/Rothera (UTC-03:00)"
            },
            {
                "name": "Atlantic/Bermuda",
                "pretty_name": "Atlantic/Bermuda (UTC-03:00)"
            },
            {
                "name": "Atlantic/Stanley",
                "pretty_name": "Atlantic/Stanley (UTC-03:00)"
            },
            {
                "name": "America/St_Johns",
                "pretty_name": "America/St_Johns (UTC-02:30)"
            },
            {
                "name": "America/Miquelon",
                "pretty_name": "America/Miquelon (UTC-02:00)"
            },
            {
                "name": "America/Noronha",
                "pretty_name": "America/Noronha (UTC-02:00)"
            },
            {
                "name": "Atlantic/South_Georgia",
                "pretty_name": "Atlantic/South_Georgia (UTC-02:00)"
            },
            {
                "name": "America/Scoresbysund",
                "pretty_name": "America/Scoresbysund (UTC-01:00)"
            },
            {
                "name": "Atlantic/Azores",
                "pretty_name": "Atlantic/Azores (UTC-01:00)"
            },
            {
                "name": "Atlantic/Cape_Verde",
                "pretty_name": "Atlantic/Cape_Verde (UTC-01:00)"
            },
            {
                "name": "Africa/Abidjan",
                "pretty_name": "Africa/Abidjan (UTC+00:00)"
            },
            {
                "name": "Africa/Accra",
                "pretty_name": "Africa/Accra (UTC+00:00)"
            },
            {
                "name": "Africa/Bamako",
                "pretty_name": "Africa/Bamako (UTC+00:00)"
            },
            {
                "name": "Africa/Banjul",
                "pretty_name": "Africa/Banjul (UTC+00:00)"
            },
            {
                "name": "Africa/Bissau",
                "pretty_name": "Africa/Bissau (UTC+00:00)"
            },
            {
                "name": "Africa/Casablanca",
                "pretty_name": "Africa/Casablanca (UTC+00:00)"
            },
            {
                "name": "Africa/Conakry",
                "pretty_name": "Africa/Conakry (UTC+00:00)"
            },
            {
                "name": "Africa/Dakar",
                "pretty_name": "Africa/Dakar (UTC+00:00)"
            },
            {
                "name": "Africa/El_Aaiun",
                "pretty_name": "Africa/El_Aaiun (UTC+00:00)"
            },
            {
                "name": "Africa/Freetown",
                "pretty_name": "Africa/Freetown (UTC+00:00)"
            },
            {
                "name": "Africa/Lome",
                "pretty_name": "Africa/Lome (UTC+00:00)"
            },
            {
                "name": "Africa/Monrovia",
                "pretty_name": "Africa/Monrovia (UTC+00:00)"
            },
            {
                "name": "Africa/Nouakchott",
                "pretty_name": "Africa/Nouakchott (UTC+00:00)"
            },
            {
                "name": "Africa/Ouagadougou",
                "pretty_name": "Africa/Ouagadougou (UTC+00:00)"
            },
            {
                "name": "Africa/Sao_Tome",
                "pretty_name": "Africa/Sao_Tome (UTC+00:00)"
            },
            {
                "name": "America/Danmarkshavn",
                "pretty_name": "America/Danmarkshavn (UTC+00:00)"
            },
            {
                "name": "Antarctica/Troll",
                "pretty_name": "Antarctica/Troll (UTC+00:00)"
            },
            {
                "name": "Atlantic/Canary",
                "pretty_name": "Atlantic/Canary (UTC+00:00)"
            },
            {
                "name": "Atlantic/Faroe",
                "pretty_name": "Atlantic/Faroe (UTC+00:00)"
            },
            {
                "name": "Atlantic/Madeira",
                "pretty_name": "Atlantic/Madeira (UTC+00:00)"
            },
            {
                "name": "Atlantic/Reykjavik",
                "pretty_name": "Atlantic/Reykjavik (UTC+00:00)"
            },
            {
                "name": "Atlantic/St_Helena",
                "pretty_name": "Atlantic/St_Helena (UTC+00:00)"
            },
            {
                "name": "Europe/Dublin",
                "pretty_name": "Europe/Dublin (UTC+00:00)"
            },
            {
                "name": "Europe/Guernsey",
                "pretty_name": "Europe/Guernsey (UTC+00:00)"
            },
            {
                "name": "Europe/Isle_of_Man",
                "pretty_name": "Europe/Isle_of_Man (UTC+00:00)"
            },
            {
                "name": "Europe/Jersey",
                "pretty_name": "Europe/Jersey (UTC+00:00)"
            },
            {
                "name": "Europe/Lisbon",
                "pretty_name": "Europe/Lisbon (UTC+00:00)"
            },
            {
                "name": "Europe/London",
                "pretty_name": "Europe/London (UTC+00:00)"
            },
            {
                "name": "UTC",
                "pretty_name": "UTC (UTC+00:00)"
            },
            {
                "name": "Africa/Algiers",
                "pretty_name": "Africa/Algiers (UTC+01:00)"
            },
            {
                "name": "Africa/Bangui",
                "pretty_name": "Africa/Bangui (UTC+01:00)"
            },
            {
                "name": "Africa/Brazzaville",
                "pretty_name": "Africa/Brazzaville (UTC+01:00)"
            },
            {
                "name": "Africa/Ceuta",
                "pretty_name": "Africa/Ceuta (UTC+01:00)"
            },
            {
                "name": "Africa/Douala",
                "pretty_name": "Africa/Douala (UTC+01:00)"
            },
            {
                "name": "Africa/Kinshasa",
                "pretty_name": "Africa/Kinshasa (UTC+01:00)"
            },
            {
                "name": "Africa/Lagos",
                "pretty_name": "Africa/Lagos (UTC+01:00)"
            },
            {
                "name": "Africa/Libreville",
                "pretty_name": "Africa/Libreville (UTC+01:00)"
            },
            {
                "name": "Africa/Luanda",
                "pretty_name": "Africa/Luanda (UTC+01:00)"
            },
            {
                "name": "Africa/Malabo",
                "pretty_name": "Africa/Malabo (UTC+01:00)"
            },
            {
                "name": "Africa/Ndjamena",
                "pretty_name": "Africa/Ndjamena (UTC+01:00)"
            },
            {
                "name": "Africa/Niamey",
                "pretty_name": "Africa/Niamey (UTC+01:00)"
            },
            {
                "name": "Africa/Porto-Novo",
                "pretty_name": "Africa/Porto-Novo (UTC+01:00)"
            },
            {
                "name": "Africa/Tunis",
                "pretty_name": "Africa/Tunis (UTC+01:00)"
            },
            {
                "name": "Arctic/Longyearbyen",
                "pretty_name": "Arctic/Longyearbyen (UTC+01:00)"
            },
            {
                "name": "Europe/Amsterdam",
                "pretty_name": "Europe/Amsterdam (UTC+01:00)"
            },
            {
                "name": "Europe/Andorra",
                "pretty_name": "Europe/Andorra (UTC+01:00)"
            },
            {
                "name": "Europe/Belgrade",
                "pretty_name": "Europe/Belgrade (UTC+01:00)"
            },
            {
                "name": "Europe/Berlin",
                "pretty_name": "Europe/Berlin (UTC+01:00)"
            },
            {
                "name": "Europe/Bratislava",
                "pretty_name": "Europe/Bratislava (UTC+01:00)"
            },
            {
                "name": "Europe/Brussels",
                "pretty_name": "Europe/Brussels (UTC+01:00)"
            },
            {
                "name": "Europe/Budapest",
                "pretty_name": "Europe/Budapest (UTC+01:00)"
            },
            {
                "name": "Europe/Busingen",
                "pretty_name": "Europe/Busingen (UTC+01:00)"
            },
            {
                "name": "Europe/Copenhagen",
                "pretty_name": "Europe/Copenhagen (UTC+01:00)"
            },
            {
                "name": "Europe/Gibraltar",
                "pretty_name": "Europe/Gibraltar (UTC+01:00)"
            },
            {
                "name": "Europe/Ljubljana",
                "pretty_name": "Europe/Ljubljana (UTC+01:00)"
            },
            {
                "name": "Europe/Luxembourg",
                "pretty_name": "Europe/Luxembourg (UTC+01:00)"
            },
            {
                "name": "Europe/Madrid",
                "pretty_name": "Europe/Madrid (UTC+01:00)"
            },
            {
                "name": "Europe/Malta",
                "pretty_name": "Europe/Malta (UTC+01:00)"
            },
            {
                "name": "Europe/Monaco",
                "pretty_name": "Europe/Monaco (UTC+01:00)"
            },
            {
                "name": "Europe/Oslo",
                "pretty_name": "Europe/Oslo (UTC+01:00)"
            },
            {
                "name": "Europe/Paris",
                "pretty_name": "Europe/Paris (UTC+01:00)"
            },
            {
                "name": "Europe/Podgorica",
                "pretty_name": "Europe/Podgorica (UTC+01:00)"
            },
            {
                "name": "Europe/Prague",
                "pretty_name": "Europe/Prague (UTC+01:00)"
            },
            {
                "name": "Europe/Rome",
                "pretty_name": "Europe/Rome (UTC+01:00)"
            },
            {
                "name": "Europe/San_Marino",
                "pretty_name": "Europe/San_Marino (UTC+01:00)"
            },
            {
                "name": "Europe/Sarajevo",
                "pretty_name": "Europe/Sarajevo (UTC+01:00)"
            },
            {
                "name": "Europe/Skopje",
                "pretty_name": "Europe/Skopje (UTC+01:00)"
            },
            {
                "name": "Europe/Stockholm",
                "pretty_name": "Europe/Stockholm (UTC+01:00)"
            },
            {
                "name": "Europe/Tirane",
                "pretty_name": "Europe/Tirane (UTC+01:00)"
            },
            {
                "name": "Europe/Vaduz",
                "pretty_name": "Europe/Vaduz (UTC+01:00)"
            },
            {
                "name": "Europe/Vatican",
                "pretty_name": "Europe/Vatican (UTC+01:00)"
            },
            {
                "name": "Europe/Vienna",
                "pretty_name": "Europe/Vienna (UTC+01:00)"
            },
            {
                "name": "Europe/Warsaw",
                "pretty_name": "Europe/Warsaw (UTC+01:00)"
            },
            {
                "name": "Europe/Zagreb",
                "pretty_name": "Europe/Zagreb (UTC+01:00)"
            },
            {
                "name": "Europe/Zurich",
                "pretty_name": "Europe/Zurich (UTC+01:00)"
            },
            {
                "name": "Africa/Blantyre",
                "pretty_name": "Africa/Blantyre (UTC+02:00)"
            },
            {
                "name": "Africa/Bujumbura",
                "pretty_name": "Africa/Bujumbura (UTC+02:00)"
            },
            {
                "name": "Africa/Cairo",
                "pretty_name": "Africa/Cairo (UTC+02:00)"
            },
            {
                "name": "Africa/Gaborone",
                "pretty_name": "Africa/Gaborone (UTC+02:00)"
            },
            {
                "name": "Africa/Harare",
                "pretty_name": "Africa/Harare (UTC+02:00)"
            },
            {
                "name": "Africa/Johannesburg",
                "pretty_name": "Africa/Johannesburg (UTC+02:00)"
            },
            {
                "name": "Africa/Kigali",
                "pretty_name": "Africa/Kigali (UTC+02:00)"
            },
            {
                "name": "Africa/Lubumbashi",
                "pretty_name": "Africa/Lubumbashi (UTC+02:00)"
            },
            {
                "name": "Africa/Lusaka",
                "pretty_name": "Africa/Lusaka (UTC+02:00)"
            },
            {
                "name": "Africa/Maputo",
                "pretty_name": "Africa/Maputo (UTC+02:00)"
            },
            {
                "name": "Africa/Maseru",
                "pretty_name": "Africa/Maseru (UTC+02:00)"
            },
            {
                "name": "Africa/Mbabane",
                "pretty_name": "Africa/Mbabane (UTC+02:00)"
            },
            {
                "name": "Africa/Tripoli",
                "pretty_name": "Africa/Tripoli (UTC+02:00)"
            },
            {
                "name": "Africa/Windhoek",
                "pretty_name": "Africa/Windhoek (UTC+02:00)"
            },
            {
                "name": "Asia/Amman",
                "pretty_name": "Asia/Amman (UTC+02:00)"
            },
            {
                "name": "Asia/Beirut",
                "pretty_name": "Asia/Beirut (UTC+02:00)"
            },
            {
                "name": "Asia/Damascus",
                "pretty_name": "Asia/Damascus (UTC+02:00)"
            },
            {
                "name": "Asia/Gaza",
                "pretty_name": "Asia/Gaza (UTC+02:00)"
            },
            {
                "name": "Asia/Hebron",
                "pretty_name": "Asia/Hebron (UTC+02:00)"
            },
            {
                "name": "Asia/Jerusalem",
                "pretty_name": "Asia/Jerusalem (UTC+02:00)"
            },
            {
                "name": "Asia/Nicosia",
                "pretty_name": "Asia/Nicosia (UTC+02:00)"
            },
            {
                "name": "Europe/Athens",
                "pretty_name": "Europe/Athens (UTC+02:00)"
            },
            {
                "name": "Europe/Bucharest",
                "pretty_name": "Europe/Bucharest (UTC+02:00)"
            },
            {
                "name": "Europe/Chisinau",
                "pretty_name": "Europe/Chisinau (UTC+02:00)"
            },
            {
                "name": "Europe/Helsinki",
                "pretty_name": "Europe/Helsinki (UTC+02:00)"
            },
            {
                "name": "Europe/Kaliningrad",
                "pretty_name": "Europe/Kaliningrad (UTC+02:00)"
            },
            {
                "name": "Europe/Kiev",
                "pretty_name": "Europe/Kiev (UTC+02:00)"
            },
            {
                "name": "Europe/Mariehamn",
                "pretty_name": "Europe/Mariehamn (UTC+02:00)"
            },
            {
                "name": "Europe/Riga",
                "pretty_name": "Europe/Riga (UTC+02:00)"
            },
            {
                "name": "Europe/Sofia",
                "pretty_name": "Europe/Sofia (UTC+02:00)"
            },
            {
                "name": "Europe/Tallinn",
                "pretty_name": "Europe/Tallinn (UTC+02:00)"
            },
            {
                "name": "Europe/Uzhgorod",
                "pretty_name": "Europe/Uzhgorod (UTC+02:00)"
            },
            {
                "name": "Europe/Vilnius",
                "pretty_name": "Europe/Vilnius (UTC+02:00)"
            },
            {
                "name": "Europe/Zaporozhye",
                "pretty_name": "Europe/Zaporozhye (UTC+02:00)"
            },
            {
                "name": "Africa/Addis_Ababa",
                "pretty_name": "Africa/Addis_Ababa (UTC+03:00)"
            },
            {
                "name": "Africa/Asmara",
                "pretty_name": "Africa/Asmara (UTC+03:00)"
            },
            {
                "name": "Africa/Dar_es_Salaam",
                "pretty_name": "Africa/Dar_es_Salaam (UTC+03:00)"
            },
            {
                "name": "Africa/Djibouti",
                "pretty_name": "Africa/Djibouti (UTC+03:00)"
            },
            {
                "name": "Africa/Juba",
                "pretty_name": "Africa/Juba (UTC+03:00)"
            },
            {
                "name": "Africa/Kampala",
                "pretty_name": "Africa/Kampala (UTC+03:00)"
            },
            {
                "name": "Africa/Khartoum",
                "pretty_name": "Africa/Khartoum (UTC+03:00)"
            },
            {
                "name": "Africa/Mogadishu",
                "pretty_name": "Africa/Mogadishu (UTC+03:00)"
            },
            {
                "name": "Africa/Nairobi",
                "pretty_name": "Africa/Nairobi (UTC+03:00)"
            },
            {
                "name": "Antarctica/Syowa",
                "pretty_name": "Antarctica/Syowa (UTC+03:00)"
            },
            {
                "name": "Asia/Aden",
                "pretty_name": "Asia/Aden (UTC+03:00)"
            },
            {
                "name": "Asia/Baghdad",
                "pretty_name": "Asia/Baghdad (UTC+03:00)"
            },
            {
                "name": "Asia/Bahrain",
                "pretty_name": "Asia/Bahrain (UTC+03:00)"
            },
            {
                "name": "Asia/Famagusta",
                "pretty_name": "Asia/Famagusta (UTC+03:00)"
            },
            {
                "name": "Asia/Kuwait",
                "pretty_name": "Asia/Kuwait (UTC+03:00)"
            },
            {
                "name": "Asia/Qatar",
                "pretty_name": "Asia/Qatar (UTC+03:00)"
            },
            {
                "name": "Asia/Riyadh",
                "pretty_name": "Asia/Riyadh (UTC+03:00)"
            },
            {
                "name": "Europe/Istanbul",
                "pretty_name": "Europe/Istanbul (UTC+03:00)"
            },
            {
                "name": "Europe/Kirov",
                "pretty_name": "Europe/Kirov (UTC+03:00)"
            },
            {
                "name": "Europe/Minsk",
                "pretty_name": "Europe/Minsk (UTC+03:00)"
            },
            {
                "name": "Europe/Moscow",
                "pretty_name": "Europe/Moscow (UTC+03:00)"
            },
            {
                "name": "Europe/Simferopol",
                "pretty_name": "Europe/Simferopol (UTC+03:00)"
            },
            {
                "name": "Europe/Volgograd",
                "pretty_name": "Europe/Volgograd (UTC+03:00)"
            },
            {
                "name": "Indian/Antananarivo",
                "pretty_name": "Indian/Antananarivo (UTC+03:00)"
            },
            {
                "name": "Indian/Comoro",
                "pretty_name": "Indian/Comoro (UTC+03:00)"
            },
            {
                "name": "Indian/Mayotte",
                "pretty_name": "Indian/Mayotte (UTC+03:00)"
            },
            {
                "name": "Asia/Tehran",
                "pretty_name": "Asia/Tehran (UTC+03:30)"
            },
            {
                "name": "Asia/Baku",
                "pretty_name": "Asia/Baku (UTC+04:00)"
            },
            {
                "name": "Asia/Dubai",
                "pretty_name": "Asia/Dubai (UTC+04:00)"
            },
            {
                "name": "Asia/Muscat",
                "pretty_name": "Asia/Muscat (UTC+04:00)"
            },
            {
                "name": "Asia/Tbilisi",
                "pretty_name": "Asia/Tbilisi (UTC+04:00)"
            },
            {
                "name": "Asia/Yerevan",
                "pretty_name": "Asia/Yerevan (UTC+04:00)"
            },
            {
                "name": "Europe/Astrakhan",
                "pretty_name": "Europe/Astrakhan (UTC+04:00)"
            },
            {
                "name": "Europe/Samara",
                "pretty_name": "Europe/Samara (UTC+04:00)"
            },
            {
                "name": "Europe/Saratov",
                "pretty_name": "Europe/Saratov (UTC+04:00)"
            },
            {
                "name": "Europe/Ulyanovsk",
                "pretty_name": "Europe/Ulyanovsk (UTC+04:00)"
            },
            {
                "name": "Indian/Mahe",
                "pretty_name": "Indian/Mahe (UTC+04:00)"
            },
            {
                "name": "Indian/Mauritius",
                "pretty_name": "Indian/Mauritius (UTC+04:00)"
            },
            {
                "name": "Indian/Reunion",
                "pretty_name": "Indian/Reunion (UTC+04:00)"
            },
            {
                "name": "Asia/Kabul",
                "pretty_name": "Asia/Kabul (UTC+04:30)"
            },
            {
                "name": "Antarctica/Mawson",
                "pretty_name": "Antarctica/Mawson (UTC+05:00)"
            },
            {
                "name": "Asia/Aqtau",
                "pretty_name": "Asia/Aqtau (UTC+05:00)"
            },
            {
                "name": "Asia/Aqtobe",
                "pretty_name": "Asia/Aqtobe (UTC+05:00)"
            },
            {
                "name": "Asia/Ashgabat",
                "pretty_name": "Asia/Ashgabat (UTC+05:00)"
            },
            {
                "name": "Asia/Atyrau",
                "pretty_name": "Asia/Atyrau (UTC+05:00)"
            },
            {
                "name": "Asia/Dushanbe",
                "pretty_name": "Asia/Dushanbe (UTC+05:00)"
            },
            {
                "name": "Asia/Karachi",
                "pretty_name": "Asia/Karachi (UTC+05:00)"
            },
            {
                "name": "Asia/Oral",
                "pretty_name": "Asia/Oral (UTC+05:00)"
            },
            {
                "name": "Asia/Samarkand",
                "pretty_name": "Asia/Samarkand (UTC+05:00)"
            },
            {
                "name": "Asia/Tashkent",
                "pretty_name": "Asia/Tashkent (UTC+05:00)"
            },
            {
                "name": "Asia/Yekaterinburg",
                "pretty_name": "Asia/Yekaterinburg (UTC+05:00)"
            },
            {
                "name": "Indian/Kerguelen",
                "pretty_name": "Indian/Kerguelen (UTC+05:00)"
            },
            {
                "name": "Indian/Maldives",
                "pretty_name": "Indian/Maldives (UTC+05:00)"
            },
            {
                "name": "Asia/Colombo",
                "pretty_name": "Asia/Colombo (UTC+05:30)"
            },
            {
                "name": "Asia/Kolkata",
                "pretty_name": "Asia/Kolkata (UTC+05:30)"
            },
            {
                "name": "Asia/Kathmandu",
                "pretty_name": "Asia/Kathmandu (UTC+05:45)"
            },
            {
                "name": "Antarctica/Vostok",
                "pretty_name": "Antarctica/Vostok (UTC+06:00)"
            },
            {
                "name": "Asia/Almaty",
                "pretty_name": "Asia/Almaty (UTC+06:00)"
            },
            {
                "name": "Asia/Bishkek",
                "pretty_name": "Asia/Bishkek (UTC+06:00)"
            },
            {
                "name": "Asia/Dhaka",
                "pretty_name": "Asia/Dhaka (UTC+06:00)"
            },
            {
                "name": "Asia/Omsk",
                "pretty_name": "Asia/Omsk (UTC+06:00)"
            },
            {
                "name": "Asia/Qyzylorda",
                "pretty_name": "Asia/Qyzylorda (UTC+06:00)"
            },
            {
                "name": "Asia/Thimphu",
                "pretty_name": "Asia/Thimphu (UTC+06:00)"
            },
            {
                "name": "Asia/Urumqi",
                "pretty_name": "Asia/Urumqi (UTC+06:00)"
            },
            {
                "name": "Indian/Chagos",
                "pretty_name": "Indian/Chagos (UTC+06:00)"
            },
            {
                "name": "Asia/Yangon",
                "pretty_name": "Asia/Yangon (UTC+06:30)"
            },
            {
                "name": "Indian/Cocos",
                "pretty_name": "Indian/Cocos (UTC+06:30)"
            },
            {
                "name": "Antarctica/Davis",
                "pretty_name": "Antarctica/Davis (UTC+07:00)"
            },
            {
                "name": "Asia/Bangkok",
                "pretty_name": "Asia/Bangkok (UTC+07:00)"
            },
            {
                "name": "Asia/Barnaul",
                "pretty_name": "Asia/Barnaul (UTC+07:00)"
            },
            {
                "name": "Asia/Ho_Chi_Minh",
                "pretty_name": "Asia/Ho_Chi_Minh (UTC+07:00)"
            },
            {
                "name": "Asia/Hovd",
                "pretty_name": "Asia/Hovd (UTC+07:00)"
            },
            {
                "name": "Asia/Jakarta",
                "pretty_name": "Asia/Jakarta (UTC+07:00)"
            },
            {
                "name": "Asia/Krasnoyarsk",
                "pretty_name": "Asia/Krasnoyarsk (UTC+07:00)"
            },
            {
                "name": "Asia/Novokuznetsk",
                "pretty_name": "Asia/Novokuznetsk (UTC+07:00)"
            },
            {
                "name": "Asia/Novosibirsk",
                "pretty_name": "Asia/Novosibirsk (UTC+07:00)"
            },
            {
                "name": "Asia/Phnom_Penh",
                "pretty_name": "Asia/Phnom_Penh (UTC+07:00)"
            },
            {
                "name": "Asia/Pontianak",
                "pretty_name": "Asia/Pontianak (UTC+07:00)"
            },
            {
                "name": "Asia/Tomsk",
                "pretty_name": "Asia/Tomsk (UTC+07:00)"
            },
            {
                "name": "Asia/Vientiane",
                "pretty_name": "Asia/Vientiane (UTC+07:00)"
            },
            {
                "name": "Indian/Christmas",
                "pretty_name": "Indian/Christmas (UTC+07:00)"
            },
            {
                "name": "Asia/Brunei",
                "pretty_name": "Asia/Brunei (UTC+08:00)"
            },
            {
                "name": "Asia/Choibalsan",
                "pretty_name": "Asia/Choibalsan (UTC+08:00)"
            },
            {
                "name": "Asia/Hong_Kong",
                "pretty_name": "Asia/Hong_Kong (UTC+08:00)"
            },
            {
                "name": "Asia/Irkutsk",
                "pretty_name": "Asia/Irkutsk (UTC+08:00)"
            },
            {
                "name": "Asia/Kuala_Lumpur",
                "pretty_name": "Asia/Kuala_Lumpur (UTC+08:00)"
            },
            {
                "name": "Asia/Kuching",
                "pretty_name": "Asia/Kuching (UTC+08:00)"
            },
            {
                "name": "Asia/Macau",
                "pretty_name": "Asia/Macau (UTC+08:00)"
            },
            {
                "name": "Asia/Makassar",
                "pretty_name": "Asia/Makassar (UTC+08:00)"
            },
            {
                "name": "Asia/Manila",
                "pretty_name": "Asia/Manila (UTC+08:00)"
            },
            {
                "name": "Asia/Shanghai",
                "pretty_name": "Asia/Shanghai (UTC+08:00)"
            },
            {
                "name": "Asia/Singapore",
                "pretty_name": "Asia/Singapore (UTC+08:00)"
            },
            {
                "name": "Asia/Taipei",
                "pretty_name": "Asia/Taipei (UTC+08:00)"
            },
            {
                "name": "Asia/Ulaanbaatar",
                "pretty_name": "Asia/Ulaanbaatar (UTC+08:00)"
            },
            {
                "name": "Australia/Perth",
                "pretty_name": "Australia/Perth (UTC+08:00)"
            },
            {
                "name": "Asia/Pyongyang",
                "pretty_name": "Asia/Pyongyang (UTC+08:30)"
            },
            {
                "name": "Australia/Eucla",
                "pretty_name": "Australia/Eucla (UTC+08:45)"
            },
            {
                "name": "Asia/Chita",
                "pretty_name": "Asia/Chita (UTC+09:00)"
            },
            {
                "name": "Asia/Dili",
                "pretty_name": "Asia/Dili (UTC+09:00)"
            },
            {
                "name": "Asia/Jayapura",
                "pretty_name": "Asia/Jayapura (UTC+09:00)"
            },
            {
                "name": "Asia/Khandyga",
                "pretty_name": "Asia/Khandyga (UTC+09:00)"
            },
            {
                "name": "Asia/Seoul",
                "pretty_name": "Asia/Seoul (UTC+09:00)"
            },
            {
                "name": "Asia/Tokyo",
                "pretty_name": "Asia/Tokyo (UTC+09:00)"
            },
            {
                "name": "Asia/Yakutsk",
                "pretty_name": "Asia/Yakutsk (UTC+09:00)"
            },
            {
                "name": "Pacific/Palau",
                "pretty_name": "Pacific/Palau (UTC+09:00)"
            },
            {
                "name": "Australia/Darwin",
                "pretty_name": "Australia/Darwin (UTC+09:30)"
            },
            {
                "name": "Antarctica/DumontDUrville",
                "pretty_name": "Antarctica/DumontDUrville (UTC+10:00)"
            },
            {
                "name": "Asia/Ust-Nera",
                "pretty_name": "Asia/Ust-Nera (UTC+10:00)"
            },
            {
                "name": "Asia/Vladivostok",
                "pretty_name": "Asia/Vladivostok (UTC+10:00)"
            },
            {
                "name": "Australia/Brisbane",
                "pretty_name": "Australia/Brisbane (UTC+10:00)"
            },
            {
                "name": "Australia/Lindeman",
                "pretty_name": "Australia/Lindeman (UTC+10:00)"
            },
            {
                "name": "Pacific/Chuuk",
                "pretty_name": "Pacific/Chuuk (UTC+10:00)"
            },
            {
                "name": "Pacific/Guam",
                "pretty_name": "Pacific/Guam (UTC+10:00)"
            },
            {
                "name": "Pacific/Port_Moresby",
                "pretty_name": "Pacific/Port_Moresby (UTC+10:00)"
            },
            {
                "name": "Pacific/Saipan",
                "pretty_name": "Pacific/Saipan (UTC+10:00)"
            },
            {
                "name": "Australia/Adelaide",
                "pretty_name": "Australia/Adelaide (UTC+10:30)"
            },
            {
                "name": "Australia/Broken_Hill",
                "pretty_name": "Australia/Broken_Hill (UTC+10:30)"
            },
            {
                "name": "Antarctica/Casey",
                "pretty_name": "Antarctica/Casey (UTC+11:00)"
            },
            {
                "name": "Antarctica/Macquarie",
                "pretty_name": "Antarctica/Macquarie (UTC+11:00)"
            },
            {
                "name": "Asia/Magadan",
                "pretty_name": "Asia/Magadan (UTC+11:00)"
            },
            {
                "name": "Asia/Sakhalin",
                "pretty_name": "Asia/Sakhalin (UTC+11:00)"
            },
            {
                "name": "Asia/Srednekolymsk",
                "pretty_name": "Asia/Srednekolymsk (UTC+11:00)"
            },
            {
                "name": "Australia/Currie",
                "pretty_name": "Australia/Currie (UTC+11:00)"
            },
            {
                "name": "Australia/Hobart",
                "pretty_name": "Australia/Hobart (UTC+11:00)"
            },
            {
                "name": "Australia/Lord_Howe",
                "pretty_name": "Australia/Lord_Howe (UTC+11:00)"
            },
            {
                "name": "Australia/Melbourne",
                "pretty_name": "Australia/Melbourne (UTC+11:00)"
            },
            {
                "name": "Australia/Sydney",
                "pretty_name": "Australia/Sydney (UTC+11:00)"
            },
            {
                "name": "Pacific/Bougainville",
                "pretty_name": "Pacific/Bougainville (UTC+11:00)"
            },
            {
                "name": "Pacific/Efate",
                "pretty_name": "Pacific/Efate (UTC+11:00)"
            },
            {
                "name": "Pacific/Guadalcanal",
                "pretty_name": "Pacific/Guadalcanal (UTC+11:00)"
            },
            {
                "name": "Pacific/Kosrae",
                "pretty_name": "Pacific/Kosrae (UTC+11:00)"
            },
            {
                "name": "Pacific/Norfolk",
                "pretty_name": "Pacific/Norfolk (UTC+11:00)"
            },
            {
                "name": "Pacific/Noumea",
                "pretty_name": "Pacific/Noumea (UTC+11:00)"
            },
            {
                "name": "Pacific/Pohnpei",
                "pretty_name": "Pacific/Pohnpei (UTC+11:00)"
            },
            {
                "name": "Asia/Anadyr",
                "pretty_name": "Asia/Anadyr (UTC+12:00)"
            },
            {
                "name": "Asia/Kamchatka",
                "pretty_name": "Asia/Kamchatka (UTC+12:00)"
            },
            {
                "name": "Pacific/Fiji",
                "pretty_name": "Pacific/Fiji (UTC+12:00)"
            },
            {
                "name": "Pacific/Funafuti",
                "pretty_name": "Pacific/Funafuti (UTC+12:00)"
            },
            {
                "name": "Pacific/Kwajalein",
                "pretty_name": "Pacific/Kwajalein (UTC+12:00)"
            },
            {
                "name": "Pacific/Majuro",
                "pretty_name": "Pacific/Majuro (UTC+12:00)"
            },
            {
                "name": "Pacific/Nauru",
                "pretty_name": "Pacific/Nauru (UTC+12:00)"
            },
            {
                "name": "Pacific/Tarawa",
                "pretty_name": "Pacific/Tarawa (UTC+12:00)"
            },
            {
                "name": "Pacific/Wake",
                "pretty_name": "Pacific/Wake (UTC+12:00)"
            },
            {
                "name": "Pacific/Wallis",
                "pretty_name": "Pacific/Wallis (UTC+12:00)"
            },
            {
                "name": "Antarctica/McMurdo",
                "pretty_name": "Antarctica/McMurdo (UTC+13:00)"
            },
            {
                "name": "Pacific/Auckland",
                "pretty_name": "Pacific/Auckland (UTC+13:00)"
            },
            {
                "name": "Pacific/Enderbury",
                "pretty_name": "Pacific/Enderbury (UTC+13:00)"
            },
            {
                "name": "Pacific/Fakaofo",
                "pretty_name": "Pacific/Fakaofo (UTC+13:00)"
            },
            {
                "name": "Pacific/Tongatapu",
                "pretty_name": "Pacific/Tongatapu (UTC+13:00)"
            },
            {
                "name": "Pacific/Chatham",
                "pretty_name": "Pacific/Chatham (UTC+13:45)"
            },
            {
                "name": "Pacific/Apia",
                "pretty_name": "Pacific/Apia (UTC+14:00)"
            },
            {
                "name": "Pacific/Kiritimati",
                "pretty_name": "Pacific/Kiritimati (UTC+14:00)"
            }
        ];

        this.$onInit = () => {
            $scope.$watch(() => this.selected, newValue => {
                for (let timezone of this.timezones) {
                    if (timezone.name == newValue) {
                        this.timezone = timezone;
                        break;
                    }
                }
                this.timezone = this.timezone || {"name": "UTC", "pretty_name": "UTC (UTC+00:00)"};
            });
        };
    }

    changed() {
        this.timezoneChangedCallback({timezone: this.timezone.name});
    }
}

export default{
    templateUrl: 'dashboard/shared/select-timezone/select-timezone.html',
    bindings: {label: '<', timezoneChangedCallback: '&', selected: '<'},
    controller: SelectTimezone
}
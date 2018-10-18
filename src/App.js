import React, {Component} from "react";
import {
    IntlProvider,
    FormattedMessage,
    FormattedDate,
    FormattedTime,
    FormattedNumber,
    addLocaleData
} from "react-intl";

import en from "react-intl/locale-data/en";
import zh from "react-intl/locale-data/zh";
import de from "react-intl/locale-data/de";


// NODE_ENV=development npx extract-messages -l=de,zh -o resources/locales -d en --flat false 'src/**/!(*.test).js'


addLocaleData([...zh, ...en, ...de]);

// const messages = {
//     'en-US': {welcome: `Hello {name}, you have {count, number} {count, plural, one {message} other {messages}}`},
//     zh: {welcome: `你好 {name}, 你有 {count} 条消息`},
//     de: {
//         welcome: `
//     Hallo {name}, Sie haben {count, number} {count, plural, one {Nachricht} other {Nachrichten}}`
//     }
//
// };

const messages = {};
const TimezoneRadio = ({timezone, handleOnChange, currentValue}) => (
    <>
        <input
            type="radio"
            name="timezone"
            id={timezone}
            value={timezone}
            checked={currentValue === timezone}
            onChange={handleOnChange}
        />
        <label htmlFor={timezone}>{timezone}</label>
    </>
);
const LanguageRadio = ({lang, currentValue, handleOnChange}) => (
    <>
        <input
            type="radio"
            name="lang"
            id={lang}
            value={lang}
            checked={currentValue === lang}
            onChange={handleOnChange}
        />
        <label htmlFor={lang}>{lang}</label>
    </>
);

const MessageComponent = ({name, count}) => (
    <>
        <FormattedMessage
            id="welcome"
            defaultMessage={`Hello {name}, you have {count, number} {count, plural,
                      one {message}
                      other {messages}
                    }`}
            values={{name: <b>{name}</b>, count}}
        />
        <div>
            <FormattedDate
                value={Date.now()}
            />
            <br/>
            <FormattedDate
                value={Date.now()}
                year="numeric"
                month="long"
                day="numeric"
                weekday="long"
            />
            <br/>
            <FormattedDate
                value={Date.now()}
                year="numeric"
                month="long"
                day="numeric"
            />
            <br/>
            <FormattedTime
                value={Date.now()}
                hour12={false}
            />
            <br/>
            <FormattedTime
                value={Date.now()}
            />
            <br/>
            <FormattedNumber
                value="1000"
                style="currency"
                currency="AUD"
            />
            <br/>
        </div>
    </>
);

class App extends Component {
    state = {
        locale: "en-AU",
        timezone: 'Australia/Sydney',
        users: [
            {
                name: "Tom",
                count: 1000
            },
            {
                name: "John",
                count: 1
            }
        ]
    };

    setLang = ({target}) => {
        const {value} = target;
        this.setState(_ => ({locale: value}));
    };

    setTimezone = ({target}) => {
        const {value} = target;
        this.setState(_ => ({timezone: value}));
    };

    render() {
        const langs = ['en-AU', 'en-US', 'de', 'zh'];
        const timezones = ['Australia/Sydney', 'Asia/Shanghai', 'America/New_York'];
        return (
            <IntlProvider
                locale={this.state.locale}
                defaultLocale="en-AU"
                messages={messages[this.state.locale]}
                timeZone={this.state.timezone}>
                <div>
                    <div>
                        {langs.map((lang, index) => (
                            <LanguageRadio lang={lang} handleOnChange={this.setLang} key={index}
                                           currentValue={this.state.locale}/>
                        ))}
                    </div>
                    <br/>
                    <div>
                        {timezones.map((timezone, index) => (
                            <TimezoneRadio timezone={timezone} handleOnChange={this.setTimezone}
                                           key={index}
                                           currentValue={this.state.timezone}/>
                        ))}
                    </div>
                    <br/>

                    {this.state.users.map((user, index) => (
                        <MessageComponent key={index} name={user.name} count={user.count}/>
                    ))}
                </div>
            </IntlProvider>
        );
    }
}

export default App;


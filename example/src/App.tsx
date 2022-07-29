import React, { useState } from 'react'
import {
  Checkbox,
  Forma,
  SubContext,
  Text,
  validations,
  RadioGroup,
  Radio
} from 'forma'
import 'forma/dist/index.css'
import { JsonObject } from 'type-fest'
const { required, int } = validations

const App = () => {
  const [ctx, setCtx] = useState<JsonObject>({ firstName: 'Javi' })
  const [isValid, setValid] = useState<boolean>(false)
  return (
    <div>
      <Forma
        initialContext={ctx}
        onChange={setCtx}
        onValidChange={setValid}
        columns={3}
        translations={{
          validations: {
            int: 'Solo numeritos please'
          }
        }}
      >
        <Checkbox
          model='lol'
          label='Lol'
          description='This is the description of Lol'
          validations={[required]}
        />
        <Text model='firstName' label='First Name' validations={[required]} />
        <Text model='firstName' label='First Name' />
        <Text
          model='secondName'
          label={(context) => `Second Name (${context.firstName})`}
        />
        <SubContext model='address' className='w-full container'>
          <Text model='street' label='Street Name' className='w-2'></Text>
          <Text
            model='number'
            label={({ street }) => `Number (${street})`}
            validations={[int]}
          ></Text>
        </SubContext>
        <RadioGroup model='sex' label='Sex'>
          <Radio value='female' label='Female' />
          <Radio value='male' label='Male' />
          <Radio value='other' label='Other' />
        </RadioGroup>
        <RadioGroup model='sex' label='Sex 2'>
          <Radio value='female' label='Female' />
          <Radio value='male' label='Male' />
          <Radio value='other' label='Other' />
          <Radio value='new' label='New' />
        </RadioGroup>
      </Forma>
      <div
        style={{
          display: 'block',
          margin: '8px'
        }}
      >
        Form is {isValid ? '✅ Valid' : '❌ Invalid'}
        <pre
          data-lang='scss'
          className='prettyprint'
          style={{
            display: 'block',
            width: '100%',
            height: '300px',
            boxSizing: 'border-box',
            fontFamily: 'Monaco, Menlo, Consolas, "Courier New", monospace',
            background: '#fff',
            backgroundColor: '#1D1E22',
            color: '#fff',
            fontSize: '13px'
          }}
        >
          {JSON.stringify(ctx, null, 2)}
        </pre>
      </div>
    </div>
  )
}

export default App

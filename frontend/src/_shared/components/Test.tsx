import React, {useMemo, useRef, useState} from 'react';
import {TestResponse} from "../types/test.type";
import TestService from "../services/test.service";

interface Props {
}

function Test(props: Props) {

  const [loading, setLoading] = useState<boolean>(false);
  const [test, setTest] = useState<TestResponse>({text: "hallo"});

  const updateRef = useRef(() => {
    setLoading(true);
    new TestService()
      .getTest()
      .then((response: TestResponse) => {
        setTest(response);
      })
      .catch(error => {
        console.log(error)
      })
      .finally(() => {
        setLoading(false);
      })
  });

  //not in use
  const fetchData = useMemo(() => {
    updateRef.current();
    return true;
  }, [updateRef]);

  return (
    <div>
      <div>
        {loading && (
          loading
        )}
      </div>
      <div>
        {!loading && (
          <h1>{test.text}</h1>
        )}
      </div>
    </div>
  )
}

export default Test;
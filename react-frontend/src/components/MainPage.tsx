import styled from "styled-components";
import Button from "../shared/Button.tsx";
import remoteService from "../services/RemoteService.tsx";
import { useState } from "react";
import { OpenAiRequestDto, OpenAiResponseDto } from "../shared/model.tsx";
import Input from "../shared/Input.tsx";

const Section = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ExampleTitle = styled.h3`
  font-size: 2rem;
  margin-bottom: 0;
  color: var(--secondary);
  padding-bottom: 4%;
`;

export default function MainPage() {
  function LoadTrainingPlan() {
    loadDataFromOpenAi();
  }

  const [openAiRequest, setOpenAiRequest] = useState<string>("");
  const [openAiResponse, setOpenAiResponse] = useState<
    OpenAiResponseDto | undefined
  >(undefined);

  function loadDataFromOpenAi() {
    const request: OpenAiRequestDto = {
      freeText: openAiRequest,
    };

    remoteService
      .post<OpenAiResponseDto>("/mvp", request)
      .then((result: OpenAiResponseDto) => {
        console.log(result.response);
        setOpenAiResponse(result);
      });

    setOpenAiRequest("");
  }

  return (
    <Section>
      <ExampleTitle>Please describe your training idea</ExampleTitle>
      <Input
        type="string"
        value={openAiRequest}
        onChange={(e) => setOpenAiRequest(e.target.value)}
      />
      <Button onClick={LoadTrainingPlan}>Submit</Button>
      <p>{openAiResponse?.response}</p>
    </Section>
  );
}

"use client";
import { useEffect, useState } from "react";
import React from "react";
import { CheckCircledIcon, CrossCircledIcon } from "@radix-ui/react-icons";
import AboutDevice from "@/components/Sensitivity/AboutDevice";
import CameraSensitivity from "@/components/Sensitivity/SliderComponents/CameraSensitivity";
import ADSSensitivity from "@/components/Sensitivity/SliderComponents/ADSSensitivity";
import CameraFreeLook from "@/components/Sensitivity/SliderComponents/CameraFreeLook";
import GyroSensitvity from "@/components/Sensitivity/SliderComponents/GyroSensitvity";
import { getSingleDevice } from "@/lib/actions/GetSensitivities.action";
import { set } from "zod";
import LoadingDetails from "./loadingDetails";


function SensitivityDetail({ slug }: { slug: string }) {
  const [device, setDeviceData] = useState<any>({});
  const [loading, setLoading] = useState(true);
  const getDeviceData = async () => {
    setLoading(true);
    const { device } = await getSingleDevice(slug);
    setDeviceData(device);
    setLoading(false);
  };

  useEffect(() => {
    getDeviceData();
  }, []);
  return (
    <>
      {loading ? (
        <LoadingDetails/>
      ) : (
        <>
          <div className="flex flex-col gap-1 mt-4 dark:text-light-500">
            <div className="flex gap-3 items-center ">
              {device.intro ? (
                <CheckCircledIcon className="text-[#adfa1d]" />
              ) : (
                <CrossCircledIcon className="text-red-500" />
              )}
              <p className="font-spaceGrotesk text-[12px]  ">Intro</p>
            </div>
            <div className="flex gap-3 items-center ">
              {device.gyroscope ? (
                <CheckCircledIcon className="text-[#adfa1d]" />
              ) : (
                <CrossCircledIcon className="text-red-500" />
              )}
              <p className="font-spaceGrotesk text-[12px]  ">GyroScope</p>
            </div>
            <div className="flex gap-3 items-center">
              {device.camera ? (
                <CheckCircledIcon className="text-[#adfa1d]" />
              ) : (
                <CrossCircledIcon className="text-red-500" />
              )}
              <p className="font-spaceGrotesk text-[12px]">Camera</p>
            </div>

            <div className="flex gap-3 items-center">
              {device.ads ? (
                <CheckCircledIcon className="text-[#adfa1d]" />
              ) : (
                <CrossCircledIcon className="text-red-500" />
              )}
              <p className="font-spaceGrotesk text-[12px]">ADS</p>
            </div>
            <div className="flex gap-3 items-center">
              {device.claws ? (
                <CheckCircledIcon className="text-[#adfa1d]" />
              ) : (
                <CrossCircledIcon className="text-red-500" />
              )}
              <p className="font-spaceGrotesk text-[12px]">Claws</p>
            </div>
          </div>
          <AboutDevice device={device} />
          <h3 className="text-dark100_light900 font-spaceGrotesk h3-bold mt-3">
            Intro
          </h3>
          <p className="body-medium text-dark100_light900 mt-2 leading-5">
            {device.intro_text}
          </p>
          <h3 className="text-dark100_light900 font-spaceGrotesk h3-bold mt-3">
            Sensitivity
          </h3>
          <CameraSensitivity sensitivity={device.sensitivities[0]} />
          <ADSSensitivity sensitivity={device.sensitivities[0]} />
          <CameraFreeLook sensitivity={device.sensitivities[0]} />
          <GyroSensitvity sensitivity={device.sensitivities[0]} />
          <div
            className="markdown font-inter"
            dangerouslySetInnerHTML={{ __html: device?.explanation || "" }}
          ></div>
        </>
      )}
    </>
  );
}

export default SensitivityDetail;
